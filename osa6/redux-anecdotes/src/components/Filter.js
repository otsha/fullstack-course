import React from 'react'
import { setFilter } from '../reducers/filterReducer'

const Filter = ({ store }) => {
  const handleChange = (event) => {
    store.dispatch(setFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <h3>Filter...</h3>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter