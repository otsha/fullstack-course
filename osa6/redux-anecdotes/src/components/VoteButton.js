import React from 'react'
import { vote } from '../reducers/anecdoteReducer'

const VoteButton = ({ id, store }) => {
    const voteAnecdote = (id) => {
        store.dispatch(vote(id))
    }

    return (
        <>
            <button onClick={() => voteAnecdote(id)}>vote</button>
        </>
    )
}

export default VoteButton