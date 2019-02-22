import React from 'react'
import { postNew } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = ({ postNew, showNotification }) => {
  const newAnecdote = async (event) => {
    event.preventDefault()
    event.persist()
    const content = event.target.anecdote.value
    postNew(content)
    event.target.anecdote.value = ''
    showNotification("Added a new anecdote!", 4)
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
  showNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)