import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter }) => {
    console.log(persons)
    return (
        <>
            {persons.filter(person => person.name.toLowerCase()
                .includes(filter.toLowerCase()))
                .map(p => <div key={p.name}><Person name={p.name} number={p.number} /></div>)
            }
        </>
    )
}

export default Persons