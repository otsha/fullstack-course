import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
    ])

    const [filter, setFilter] = useState('')

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