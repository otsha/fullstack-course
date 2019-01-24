import React from 'react'
import Person from './Person'
import personService from '../services/personService'

const Persons = ({ persons, setPersons, filter }) => {
    console.log(persons)

    const handleDelete = (id) => {
        if (window.confirm("Remove?")) {
            personService.remove(id)
            setPersons(persons.filter(person => person.id !== id))
        }
    }

    return (
        <>
            {persons.filter(person => person.name.toLowerCase()
                .includes(filter.toLowerCase()))
                .map(p =>
                    <div key={p.name}>
                        <Person name={p.name} number={p.number} id={p.id} />
                        <button onClick={() => handleDelete(p.id)}>Poista</button>
                    </div>
                )
            }
        </>
    )
}

export default Persons