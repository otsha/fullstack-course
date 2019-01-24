import React, {useState} from 'react'
import Axios from 'axios';

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (newName === '') {
            window.alert('Name cannot be empty')
        } else if (persons.map(person => person.name).includes(newName)) {
            window.alert(`${newName} on jo luettelossa!`)
        } else {
            Axios.post('http://localhost:3001/persons', { name: newName, number: newNumber})
            .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewNumber('')
            })
            setPersons(persons.concat({ name: newName, number: newNumber }))
        }
    }

    return (
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
    )
}

export default PersonForm