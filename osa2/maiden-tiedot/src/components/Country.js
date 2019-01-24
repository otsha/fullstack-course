import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ name, capital, population, languages, flag }) => {
    const [weather, setWeather] = useState([])

    const weatherHook = () => {
        axios.get(`https://api.apixu.com/v1/current.json?key=a89595b62ba749859c0144604192401&q=${capital}`)
            .then(response => {
                console.log(response.data.current)
                setWeather(response.data.current)
            })
    }

    useEffect(weatherHook, [])

    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <h2>Languages</h2>
            <ul>
                {languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img alt='flag' src={flag} width='10%' height='10%' />
            <h2>Weather in {capital}</h2>
            <p>temperature: {weather.temp_c} °C</p>
            <p>wind: {weather.wind_kph} km/h</p>
        </div>
    )
}

export default Country