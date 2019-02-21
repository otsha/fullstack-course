import React from 'react';

const App = (props) => {
  const store = props.store
  const anecdotes = store.getState()
  
  const vote = (id) => {
    store.dispatch({
      type: 'VOTE',
      id: id
    })
  }

  const postNew = (event) => {
    event.preventDefault()
    store.dispatch({
      type: 'NEW',
      content: event.target.anecdote.value
    })
    event.target.anecdote.value = ''
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={postNew}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
