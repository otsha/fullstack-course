import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, bad, neutral }) => {
    if (good !== 0 || bad !== 0 || neutral !== 0) {
        return (
            <>
                <Statistic name="Hyvä" amount={good} />
                <Statistic name="Neutraali" amount={neutral} />
                <Statistic name="Huono" amount={bad} />
                <Statistic name="Yhteensä" amount={good + bad + neutral} />
                <Statistic name="Keskiarvo" amount={(good + (bad * -1)) / (good + bad + neutral)} />
                <Statistic name="Positiivisia (%)" amount={good / (good + bad + neutral) * 100} />
            </>
        )
    } else {
        return <p>Palautetta ei ole vielä annettu</p>
    }
}

const Statistic = (props) => {
    return (
        <p>
            {props.name} {props.amount}
        </p>
    )
}

const Button = (props) => {
    return (
        <button onClick={() => props.action(props.value)}>{props.text}</button>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Anna palautetta!</h1>
            <Button action={setGood} value={good + 1} text="Hyvä" />
            <Button action={setNeutral} value={neutral + 1} text="Neutraali" />
            <Button action={setBad} value={bad + 1} text="Huono" />

            <h1>Tulokset</h1>
            <Statistics good={good} bad={bad} neutral={neutral} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)