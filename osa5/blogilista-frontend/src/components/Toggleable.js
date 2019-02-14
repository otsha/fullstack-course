// the correct word is togglEable, not togglable........

import React, { useState, useImperativeMethods } from 'react'
import PropTypes from 'prop-types'

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
                <button onClick={toggle}>{props.label}</button>
            </div>
            <div style={showWhenTrue}>
                {props.children}
                <button onClick={toggle}>Hide</button>
            </div>
        </div>
    )
})

Toggleable.propTypes = {
    label: PropTypes.string.isRequired
}

export default Toggleable