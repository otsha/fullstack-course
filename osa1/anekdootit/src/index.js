import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const RandomQuoteIndex = () => {
    return Math.floor(Math.random() * anecdotes.length)
}

const Button = ({ action, text }) => {
    return (
        <button onClick={action}>{text}</button>
    )
}

const TopAnecdote = ({ votes }) => {
    let i = 0

    let largest = i

    for (i = 1; i < votes.length; i++) {
        if (votes[i] > votes[largest]) {
            largest = i
        }
    }

    return largest
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(5).fill(0))
    const [top, setTop] = useState(0)

    const vote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    return (
        <div>
            <h1>Anecdote of the Day</h1>
            {props.anecdotes[selected]}
            <br />
            <p>Votes: {votes[selected]}</p>
            <Button action={vote} text="Vote" />
            <Button action={() => { setSelected(RandomQuoteIndex) }} text="Random Quote" />

            <h1>Top Anecdote</h1>
            {props.anecdotes[top]}
            <br />
            <p>Votes: {votes[top]}</p>
            <Button action={() => {setTop(TopAnecdote({votes}))}} text="Refresh" />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)