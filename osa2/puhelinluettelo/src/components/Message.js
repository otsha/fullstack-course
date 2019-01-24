import React from 'react'

const Message = ({ text }) => {
    if (text === '') {
        return null
    } else {
        return (
            <div className="notification">
                {text}
            </div>
        )
    }
}

export default Message