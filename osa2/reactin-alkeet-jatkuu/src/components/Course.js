import React from 'react'

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

export default Course