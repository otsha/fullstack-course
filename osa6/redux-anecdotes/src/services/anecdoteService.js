import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    console.log(res.data)
    return res.data
}

const postNew = async (content) => {
    const anecdoteObject = {
        content,
        votes: 0
    }
    const res = await axios.post(baseUrl, anecdoteObject)
    return res.data
}

const vote = async (id) => {
    const req = await axios.get(`${baseUrl}/${id}`)
    const anecdote = req.data

    const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
    }
    const res = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return res.data
}

export default { getAll, postNew, vote }