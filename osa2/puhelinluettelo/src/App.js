import React, { useState, useEffect } from 'react'
import personService from './services/personService'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'



const App = () => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')

    const personHook = () => {
        personService.getAll()
            .then(response => {
                setPersons(response.data)
            })
    }

    useEffect(personHook, [])

    return (
        <div>
            <h2>Puhelinluettelo</h2>

            <Filter value={filter} setFilter={setFilter} />

            <h2>Lisää</h2>

            <PersonForm persons={persons} setPersons={setPersons} />

            <h2>Numerot</h2>

            <Persons persons={persons} setPersons={setPersons} filter={filter} />

        </div>
    )

}

export default App