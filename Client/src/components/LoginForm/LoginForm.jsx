import { Card, CardContent, Stack, TextField, Button } from '@mui/material'
import Notification from '../Notification/Notification'

import PropTypes from 'prop-types'
import LoginIcon from '@mui/icons-material/Login'
import loginBlog from '../../assets/login-blog.jpg'
import './LoginForm.css'

/**
 * LoginForm component for logging in to the application.
 *
 * Renders a form with input fields for username and password.
 * When the form is submitted, it will call the `handleLogin` function with an object
 * containing the input values.
 *
 * @param {function} handleLogin - Called with the new login object when the form is submitted.
 * @param {string} username - The initial username value.
 * @param {string} password - The initial password value.
 * @param {string} message - The initial message value.
 * @param {function} handleUsernameChange - The function to call when the username field changes.
 * @param {function} handlePasswordChange - The function to call when the password field changes.
 * @returns {React.ReactElement} - The rendered form component.
 */
const LoginForm = ({
  handleLogin,
  username,
  password,
  message,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}
      >
        <Card className="login-card">
          <CardContent>
            <Notification message={message} />
            <h2 className="title">Log in to Application</h2>
            <Stack alignItems="center" marginBottom={2}>
              <img src={loginBlog} width="220" className="login-image" />
            </Stack>
            <form onSubmit={handleLogin}>
              <div>
                <TextField
                  label="Username"
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  fullWidth
                  size="small"
                  className="input-style"
                />
              </div>

              <div>
                <TextField
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  size="small"
                  fullWidth
                  className="input-style"
                />
              </div>

              <Stack>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  className="button-style"
                >
                  <LoginIcon className="login-icon" />
                  Login
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Stack>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
