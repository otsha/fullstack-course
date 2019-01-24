import React, { useState, useEffect } from 'react'
import personService from './services/personService'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Message from './components/Message'

import './index.css'


const App = () => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState('')

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

            <Message text={message} />

            <Filter value={filter} setFilter={setFilter} />

            <h2>Lisää</h2>

            <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />

            <h2>Numerot</h2>

            <Persons persons={persons} setPersons={setPersons} filter={filter} setMessage={setMessage} />

        </div>
    )

}

export default App