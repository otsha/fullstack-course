import React from 'react'
import VoteButton from './VoteButton'
import { connect } from 'react-redux'

const AnecdoteList = ({ anecdotes, filter }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

export default connect(mapStateToProps)(AnecdoteList)