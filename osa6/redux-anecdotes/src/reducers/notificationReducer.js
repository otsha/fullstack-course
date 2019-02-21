const reducer = (state = 'no notifications', action) => {
  switch (action.type) {
    case 'SET':
      return action.message
    default:
      return state
  }
}

export default reducer