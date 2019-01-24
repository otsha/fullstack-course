import React from 'react'

const Message = ({ text, type }) => {
    if (text === '') {
        return null
    } else if (type === 'success'){
        return (
            <div className="success">
                {text}
            </div>
        )
    } else {
        return (
            <div className="error">
                {text}
            </div>
        )
    }
}

export default Message