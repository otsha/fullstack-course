const init = 'no notifications'

export const showNotification = (message) => {
  return {
    type: 'SET',
    message: message
  }
}

export const clearNotification = () => {
  return {
    type: 'SET',
    message: init
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