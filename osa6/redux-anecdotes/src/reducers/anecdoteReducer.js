const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export const postNew = (content) => {
  return {
    type: 'NEW',
    content: content
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW':
      const newAnecdote = asObject(action.content)
      return state.concat(newAnecdote)
    case 'VOTE':
      const anecdoteToVote = state.find(a => a.id === action.id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }

      return state.map(a => a.id !== action.id ? a : votedAnecdote)
    case 'INIT':
      return action.data
    default:
      return state
  }

}

export default reducer