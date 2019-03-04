export const setNotification = (message) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      message: message
    })
    setTimeout(() => {
      dispatch({
        type: 'SET',
        message: ''
      })
    }, 4000)
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return state = action.message
    default:
      return state
  }
}

export default reducer