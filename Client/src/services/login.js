import axios from 'axios'

const baseUrl = '/api/login'

/**
 * Logs in the user with the provided credentials.
 *
 * This function sends a POST request to the server
 * to log in the user. The request includes the
 * username and password of the user in the request
 * body.
 *
 * @param {Object} credentials - The data for the user to log in.
 * @param {string} credentials.username - The username of the user.
 * @param {string} credentials.password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
