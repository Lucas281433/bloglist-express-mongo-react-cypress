import { useState, useEffect, useRef } from 'react'
import { Container, Button, Stack } from '@mui/material'

import Blog from './components/Blog/Blog'
import Notification from './components/Notification/Notification'
import Togglable from './components/Togglable/Togglable'
import LoginForm from './components/LoginForm/LoginForm'
import BlogForm from './components/BlogForm/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'
import NoAccountsIcon from '@mui/icons-material/NoAccounts'
import blogImage from './assets/blog.webp'


/**
 * The App component renders a blog list app.
 * It displays a login form when the user is not logged in,
 * and a form to add a new blog, a list of blogs, and a logout button
 * when the user is logged in.
 * The list of blogs is ordered by the number of likes, and the user
 * can like and remove the blogs.
 */
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /**
   * Logs in the user and updates the application state.
   * If the login fails, it displays an error message.
   * @param {Event} event - The form submission event.
   */
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogListAppUser',
        JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('Wrong Username or Password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  /**
  * Logs out the current user by removing their data from local storage
  * and updating the application state.
  */
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListAppUser')
    setUser(null)
  }

  /**
   * Adds a new blog to the list of blogs.
   * It sends a POST request to the server to create a new blog,
   * and if the request is successful, it adds the new blog to the
   * list of blogs and resets the form.
   * If the request fails, it displays an error message.
   * @param {Object} newBlog - The data of the new blog to be added.
   */
  const addBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      const blogWithUser = {
        ...createdBlog,
        user: {
          username: user.username,
          name: user.name,
          id: user.id,
        },
      }
      setBlogs(blogs.concat(blogWithUser))
      blogFormRef.current.toggleVisibility()

      setMessage(`A new blog ${blogWithUser.title} By ${blogWithUser.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage('Error could not create blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  /**
   * Increments the likes of a blog post with the given id.
   * It finds the blog to be updated, increments its likes,
   * sends a PATCH request to the server to update the blog,
   * and if the request is successful, it updates the list of blogs.
   * @param {number} id - The id of the blog to be updated.
   */
  const addLike = async (id) => {
    const blogToUpdate = blogs.find((b) => b.id === id)

    const updatedBlog = {
      ...blogToUpdate,
      likes: (blogToUpdate.likes += 1),
    }
    await blogService.update(id, updatedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
  }

  /**
   * Removes a blog post from the list of blogs.
   * It finds the blog to be removed, prompts the user to confirm,
   * sends a DELETE request to the server to remove the blog,
   * and if the request is successful, it filters the list of blogs.
   * @param {number} id - The id of the blog to be removed.
   */
  const removeBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id)
    if (
      window.confirm(
        `Remove Blog ${blogToDelete.title} By ${blogToDelete.author}`
      )
    ) {
      await blogService.remove(id)
      setBlogs(blogs.filter((b) => b.id !== id))
    }
  }

  const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        message={message}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    )
  }

  return (
    <Container>
      <Stack direction="row" justifyContent="flex-end">
        <p>
          <span className="logged-user">
            <i>{user.name}</i> Logged In
          </span>
          <Button
            className="button-logout"
            variant="outlined"
            size="small"
            onClick={handleLogout}
          >
            <NoAccountsIcon className="icon-logout" />
            Logout
          </Button>
        </p>
      </Stack>
      <h2 className="title">Blogs</h2>
      <div className="image-position">
        <img src={blogImage} width="350" className="image-blog" />
      </div>
      <Notification message={message} />
      <Stack direction="row" justifyContent="center" marginBottom={3}>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm newBlog={addBlog} />
        </Togglable>
      </Stack>
      {blogsSorted.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </Container>
  )
}

export default App
