const init = 'no notifications'

export const showNotification = (message, timeOutLength) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      message: message
    })
    setTimeout(() => {
      dispatch({
        type: 'SET',
        message: init
      })
    }, timeOutLength * 1000);
  }
}

const reducer = (state = init, action) => {
  switch (action.type) {
    case 'SET':
      return state = action.message
    default:
      return state
  }
}

export default reducer