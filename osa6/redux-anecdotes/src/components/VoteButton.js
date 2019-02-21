import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification, clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const VoteButton = ({ vote, showNotification, clearNotification, id, content }) => {

    const voteAnecdote = (id) => {
        vote(id)
        showNotification(`You voted for "${content}"`)
        setTimeout(() => {
            clearNotification()
        }, 5000);
    }

    return (
        <>
            <button onClick={() => voteAnecdote(id)}>vote</button>
        </>
    )
}

const mapDispatchToProps = {
    vote,
    showNotification,
    clearNotification
}

export default connect(null, mapDispatchToProps)(VoteButton)