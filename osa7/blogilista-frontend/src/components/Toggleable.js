// the correct word is togglEable, not togglable........

import React, { useState, useImperativeMethods } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenTrue = { display: visible ? 'none' : '' }
  const showWhenTrue = { display: visible ? '' : 'none' }

  const toggle = () => {
    setVisible(!visible)
  }

  useImperativeMethods(ref, () => {
    return toggle
  })

  return (
    <div>
      <div style={hideWhenTrue}>
        <Button animated='vertical' onClick={toggle}>
          <Button.Content visible>{props.label}</Button.Content>
          <Button.Content hidden>
            <Icon name='pencil' />
          </Button.Content>
        </Button>
      </div>
      <div style={showWhenTrue}>
        {props.children}
        <Button onClick={toggle}>Hide</Button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  label: PropTypes.string.isRequired
}

export default Toggleable