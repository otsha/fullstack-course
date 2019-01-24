import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10,
                id: 1
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7,
                id: 2
            },
            {
                name: 'Komponenttien tila',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

const Content = (props) => {
    return (
        <>
            {props.parts.map(part => <p key={part.id}><Part part={part} /></p>)}
        </>
    )
}

const Part = (props) => {
    return (
        <>
            {props.part.name} {props.part.exercises}
        </>
    )
}

const Total = (props) => {
    let sum = 0
    for(let i = 0; i < props.parts.length; i++) {
        sum += props.parts[i].exercises
    }

    return (
        <p>yhteensä {sum} tehtävää</p>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))