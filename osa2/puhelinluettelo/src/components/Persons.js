import React from 'react'
import Person from './Person'
import personService from '../services/personService'

const Persons = ({ persons, setPersons, filter, setSuccess, setError }) => {
    console.log(persons)

    const handleDelete = (id) => {
        if (window.confirm("Remove?")) {
            personService.remove(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))
                    setSuccess('Henkilö poistettu onnistuneesti.')
                })
                .catch(error => {
                    setError('Virhe! Henkilö on jo poistettu.')
                    setPersons(persons.filter(person => person.id !== id))
                })
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