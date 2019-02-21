import React from 'react'
import VoteButton from './VoteButton'

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <VoteButton id={anecdote.id} content={anecdote.content} store={store} />
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList