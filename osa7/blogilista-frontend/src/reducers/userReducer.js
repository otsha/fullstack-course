import blogService from '../services/blogs'

export const initUsers = () => {
  return async dispatch => {
    const users = await blogService.getAllUsers()
    dispatch({
      type: 'INITUSERS',
      data: users
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITUSERS':
      return action.data
    default:
      return state
  }
}

export default reducer