import { useState } from 'react'
import { Card, Button, Stack, List, ListItem } from '@mui/material'

import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import './Blog.css'

/**
  * The Blog component renders a single blog.
  * It displays the title and author of the blog,
  * and if the user is logged in, it displays the
  * url and the likes of the blog.
  * It also displays a button to like the blog.
  * If the user is the owner of the blog, it displays
  * a button to remove the blog.
  * @param {Object} blog - The blog object
  * @param {Function} addLike - The function to increase the likes of the blog
  * @param {Function} removeBlog - The function to remove the blog
  * @param {Object} user - The user object
*/
const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hidenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  /**
   * Toggle the visibility of the blog.
   * If the blog is visible, it will be hidden.
   * If the blog is hidden, it will be visible.
   */
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <Card className="blog-card bloglist">
      <div style={hidenWhenVisible} className="visible-content">
        <span className="title-card">Title and Author:</span>
        {blog.title} {blog.author}
        <Button
          variant="contained"
          size="small"
          onClick={toggleVisibility}
          className="view-button button-style button-margin"
        >
          <RemoveRedEyeRoundedIcon className="icon-card" />
          View
        </Button>
      </div>
      <div style={showWhenVisible} className="blog">
        <Stack direction="row" justifyContent="center">
          <List>
            <ListItem>
              <span className="title-card">Title and Author:</span>
              {blog.title} {blog.author}
              <Button
                variant="contained"
                size="small"
                className="button-style button-margin"
                onClick={toggleVisibility}
              >
                <VisibilityOffRoundedIcon className="icon-card" />
                Hide
              </Button>
            </ListItem>
            <ListItem>
              <span className="title-card">Url:</span>
              <a href={blog.url} target="blank">
                {blog.url}
              </a>
            </ListItem>
            <ListItem>
              <span className="title-card">Likes:</span>
              {blog.likes}
              <Button
                variant="contained"
                size="small"
                className="button-style button-margin like-button"
                onClick={() => addLike(blog.id)}
              >
                <ThumbUpRoundedIcon className="icon-card" />
                Like
              </Button>
            </ListItem>
            <ListItem>
              <Stack marginX="auto">
                By {blog.user ? blog.user.name : ''}
                {blog.user && blog.user.name === user.name ? (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => removeBlog(blog.id)}
                    className="remove-button button-remove"
                  >
                    <DeleteForeverRoundedIcon className="icon-card" />
                    Remove
                  </Button>
                ) : null}
              </Stack>
            </ListItem>
          </List>
        </Stack>
      </div>
    </Card>
  )
}

export default Blog
