import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Stack } from '@mui/material'

import PropTypes from 'prop-types'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import './Togglable.css'

/**
 * Togglable component that allows dynamic toggling of content visibility.
 *
 * Uses the `useState` hook to maintain the visibility state of the content.
 * The component receives the button label and the content to toggle as props.
 *
 * @param {object} props - Component properties.
 * @param {string} props.buttonLabel - Button label text.
 * @param {node} props.children - Content to toggle.
 * @param {object} refs - Reference to the component for accessing its methods.
 */
const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  /**
   * Toggle the visibility of the content.
   *
   * When called, it will either show or hide the content
   * depending on the current visibility state.
   */
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <Stack style={hideWhenVisible}>
        <Button
          variant="contained"
          size="small"
          className="button-style button-togglable"
          onClick={toggleVisibility}
        >
          <AddCircleOutlineIcon className="icon-togglable" />
          {props.buttonLabel}
        </Button>
      </Stack>
      <Stack style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          size="small"
          className="button-cancel button-togglable"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </Stack>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
