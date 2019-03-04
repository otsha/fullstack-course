import blogService from '../services/blogs'

export const userLogin = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const userLogout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export default reducer