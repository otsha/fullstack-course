import anecdoteService from "../services/anecdoteService";

export const vote = (id) => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.vote(id)
    dispatch ({
      type: 'VOTE',
      id: anecdoteToVote.id
    })
  }
}

export const postNew = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.postNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW':
      const newAnecdote = action.data
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