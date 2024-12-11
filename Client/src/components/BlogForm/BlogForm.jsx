import { useState } from 'react'
import { Button, Stack, TextField } from '@mui/material'

/**
* Component for creating a new blog.
*
* Renders a form with inputs for title, author and url of a blog.
* When the form is submitted, it will call the `newBlog` function with an object
* containing the input values.
*
* @param {function} newBlog - Called with the new blog object when the form is submitted.
* @returns {React.ReactElement} - The rendered form component.
*/
const BlogForm = ({ newBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  /**
   * Submits the form data to the parent component.
   *
   * The parent component is expected to call the `newBlog` function with an object
   * containing the input values.
   *
   * The form is reset after submission.
   *
   * @param {Event} event - The form submission event.
   */
  const addBlog = (event) => {
    event.preventDefault()

    newBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2 className="title">Create a new Blog </h2>
      <Stack>
        <TextField
          type="text"
          label="Title"
          size="small"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          id="title"
          className="input-style"
        />
      </Stack>
      <Stack>
        <TextField
          type="text"
          label="Author"
          size="small"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          id="author"
          className="input-style"
        />
      </Stack>
      <Stack>
        <TextField
          type="text"
          label="URL"
          size="small"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          id="url"
          className="input-style"
        />
      </Stack>

      <Stack>
        <Button
          type="submit"
          variant="contained"
          size="small"
          className="create-button button-style"
        >
          Create
        </Button>
      </Stack>
    </form>
  )
}

export default BlogForm
