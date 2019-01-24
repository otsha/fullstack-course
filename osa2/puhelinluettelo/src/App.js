import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: ''}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
            {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </div>
    )

}

export default App