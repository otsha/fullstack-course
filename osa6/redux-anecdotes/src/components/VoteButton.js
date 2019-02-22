import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const VoteButton = ({ vote, showNotification, id, content }) => {

    const voteAnecdote = (id) => {
        vote(id)
        showNotification(`You voted for "${content}"`, 4)
    }

    return (
        <>
            <button onClick={() => voteAnecdote(id)}>vote</button>
        </>
    )
}

const mapDispatchToProps = {
    vote,
    showNotification
}

export default connect(null, mapDispatchToProps)(VoteButton)