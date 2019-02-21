import React from 'react'
import { postNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {
    const newAnecdote = (event) => {
        event.preventDefault()
        store.dispatch(postNew(event.target.anecdote.value))
        event.target.anecdote.value = ''
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

export default AnecdoteForm