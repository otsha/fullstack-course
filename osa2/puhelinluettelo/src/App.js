import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const [filter, setFilter] = useState('')

    const applyFilter = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (newName === '') {
            window.alert('Name cannot be empty')
        } else if (persons.map(person => person.name).includes(newName)) {
            window.alert(`${newName} on jo luettelossa!`)
        } else {
            setPersons(persons.concat({ name: newName, number: newNumber }))
        }
    }

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>

            <div>
                rajaa: <input
                    value={filter}
                    onChange={applyFilter}
                />
            </div>

            <h2>Lisää</h2>
            <form onSubmit={addPerson}>
                <div>
                    nimi: <input
                        value={newName}
                        onChange={handleNewName}
                    />
                </div>
                <div>
                    numero: <input
                        value={newNumber}
                        onChange={handleNewNumber}
                    />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>

            <h2>Numerot</h2>
            {persons.filter(person => person.name.toLowerCase().includes(filter)).map(p => <p key={p.name}>{p.name} {p.number}</p>)}
        </div>
    )

}

export default App