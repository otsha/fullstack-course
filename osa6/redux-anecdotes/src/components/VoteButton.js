import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, clearNotification } from '../reducers/notificationReducer'

const VoteButton = ({ id, content, store }) => {

    const voteAnecdote = (id) => {
        store.dispatch(vote(id))
        store.dispatch(showNotification(`You voted for "${content}"`))
        setTimeout(() => {
            store.dispatch(clearNotification())
        }, 5000);
    }

    return (
        <>
            <button onClick={() => voteAnecdote(id)}>vote</button>
        </>
    )
}

export default VoteButton