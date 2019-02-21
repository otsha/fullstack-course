import React from 'react'
import VoteButton from './VoteButton'
import { connect } from 'react-redux'

const AnecdoteList = ({ filtered }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {filtered.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <VoteButton id={anecdote.id} content={anecdote.content} />
          </div>
        </div>
      )}
    </div>
  )
}

const filteredAnecdotes = ({ anecdotes, filter }) => {
  return (anecdotes
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes))
}

const mapStateToProps = (state) => {
  return {
    filtered: filteredAnecdotes(state)
  }
}

export default connect(mapStateToProps)(AnecdoteList)