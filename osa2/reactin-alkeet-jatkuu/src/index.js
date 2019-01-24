import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const courses = [
        {
            name: 'Half Stack -sovelluskehitys',
            id: 1,
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
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 2,
                    id: 1
                },
                {
                    name: 'Middlewaret',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <div>
            {courses.map(course => <div key={course.id}><Course course={course} /></div>)}
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
    const sum = (total, current) => total + current

    return (
        <p>yhteensä {props.parts.map(part => part.exercises).reduce(sum)} tehtävää</p>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))