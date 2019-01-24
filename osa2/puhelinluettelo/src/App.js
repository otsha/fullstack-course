import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addName = (event) => {
        event.preventDefault();
        if (newName !== '') {
            setPersons(persons.concat({ name: newName }))
        }
    }

    const handleInput = (event) => {
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>

            <form onSubmit={addName}>
                <div>
                    nimi: <input
                        value={newName}
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>

            <h2>Numerot</h2>
            {persons.map(person => <p key={person.name}>{person.name}</p>)}
        </div>
    )

}

export default App