import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const countryHook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(countryHook, [])

  return (
    <div>
      <h1>Country Info</h1>
      <Search filter={filter} setFilter={setFilter} />
      
      <Countries countries={countries} filter={filter} />
    </div>
  )

}

export default App