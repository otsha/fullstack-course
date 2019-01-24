import React from 'react'

const Country = ({name, capital, population, languages, flag}) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img alt='flag' src={flag} width='10%' height='10%'/>
        </div>
    )
}

export default Country