import React, { useState } from 'react'
import personService from "../services/personService"

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

        const personObject = {
            name: newName,
            number: newNumber
        }

        if (newName === '') {
            window.alert('Name cannot be empty')
        } else if (persons.map(person => person.name).includes(newName)) {
            if (window.confirm(`${newName} on jo luettelossa! Korvataanko vanha numero uudella?`)) {
                const id = persons.filter(p => p.name === newName)[0].id
                personService
                    .update(id, personObject)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== id ? person : response.data))
                        setNewName('')
                        setNewNumber('')
                    })
            }
        } else {
            personService
                .save(personObject)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                })
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