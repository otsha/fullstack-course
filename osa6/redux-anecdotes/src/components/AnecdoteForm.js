import React from 'react'
import { postNew } from '../reducers/anecdoteReducer'
import { showNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = ({ postNew, showNotification, clearNotification }) => {
    const newAnecdote = async (event) => {
        event.preventDefault()
        event.persist()
        const content = event.target.anecdote.value
        const newAnecdote = await anecdoteService.postNew(content)
        postNew(newAnecdote)
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