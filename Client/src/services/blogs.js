import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

/**
 * Sets the token to be included in the Authorization header of the requests.
 * @param {string} newToken - The token to be set.
 */
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

/**
 * Fetches all blogs from the server.
 *
 * This function sends a GET request to the server to retrieve
 * all blog entries available at the specified base URL. It returns
 * a promise that resolves to the data of the response, which is
 * an array of blog objects.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of blog objects.
 */
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}


/**
 * Creates a new blog post on the server.
 *
 * This function sends a POST request to the server to create a new blog entry
 * with the provided data. The request includes an Authorization header
 * to authenticate the user.
 *
 * @param {Object} newBlog - The data for the new blog to be created.
 * @returns {Promise<Object>} A promise that resolves to the created blog object.
 */
const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}


/**
 * Updates a blog post on the server.
 *
 * This function sends a PUT request to the server to update the blog entry
 * with the provided id and data. The request includes an Authorization header
 * to authenticate the user.
 *
 * @param {number} id - The id of the blog to be updated.
 * @param {Object} blog - The updated data of the blog.
 * @returns {Promise<Object>} A promise that resolves to the updated blog object.
 */
const update = async (id, blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

/**
 * Deletes a blog post from the server.
 *
 * This function sends a DELETE request to the server to remove the blog entry
 * with the provided id. The request includes an Authorization header
 * to authenticate the user.
 *
 * @param {number} id - The id of the blog to be deleted.
 * @returns {Promise<Object>} A promise that resolves to the deleted blog object.
 */
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove, setToken }
