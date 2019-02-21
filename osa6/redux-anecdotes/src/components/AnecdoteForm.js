import React from 'react'
import { postNew } from '../reducers/anecdoteReducer'
import { showNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = ({ postNew, showNotification, clearNotification }) => {
    const newAnecdote = (event) => {
        event.preventDefault()
        postNew(event.target.anecdote.value)
        event.target.anecdote.value = ''
        showNotification("Added a new anecdote!")
        setTimeout(() => {
            clearNotification()
        }, 5000);
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={newAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    postNew,
    showNotification,
    clearNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)