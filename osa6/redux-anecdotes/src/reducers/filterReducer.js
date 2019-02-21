const init = ''

export const setFilter = (value) => {
  return {
    type: 'FILTER',
    value: value
  }
}

const reducer = (state = init, action) => {
  switch (action.type) {
    case 'FILTER':
      return state = action.value
    default:
      return state
  }
}

export default reducer