import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')

    const personHook = () => {
        axios.get("http://localhost:3001/persons")
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

            <Persons persons={persons} filter={filter} />

        </div>
    )

}

export default App