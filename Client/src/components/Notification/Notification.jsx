import { Alert } from '@mui/material'

/**
 * Notification component displays a message to the user.
 * If the message starts with 'A new', it will be displayed as a success message.
 * Otherwise, it will be displayed as an error message.
 *
 * @param {string} message The message to be displayed.
 * @returns {JSX.Element} The Notification component.
 */
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.startsWith('A new')) {
    return (
      <Alert
        variant="filled"
        severity="success"
        sx={{ backgroundColor: '#6a4c93' }}
        className="success"
      >
        {message}
      </Alert>
    )
  }

  return (
    <Alert variant="filled" severity="error">
      {message}
    </Alert>
  )
}

export default Notification
