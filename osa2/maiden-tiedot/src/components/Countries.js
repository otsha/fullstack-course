import React from 'react'
import Country from './Country'

const Countries = ({ countries, filter, setFilter }) => {
    const found = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    if (found.length > 10) {
        return (
            <p>Too many results, please be more specific</p>
        )
    } else if (found.length <= 10 && found.length > 1) {
        return (
            <div>
                {found.map(country =>
                    <p key={country.name}>
                        {country.name} <button onClick={() => setFilter(country.name)}>Show</button>
                    </p>
                )}
            </div>
        )
    } else if (found.length === 1) {
        return (
            <div>
                {found.map(country =>
                    <div key={country.name}>
                        <Country name={country.name} capital={country.capital} population={country.population} languages={country.languages} flag={country.flag} />
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <p>No results found</p>
        )
    }
}

export default Countries