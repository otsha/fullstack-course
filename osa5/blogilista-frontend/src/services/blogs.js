
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNew = async newBlog => {
  const config = { headers: { Authorization: token } }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const update = async blog => {
  const config = { headers: { Authorization: token }}
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return res.data
}

const login = async (credentials) => {
  const res = await axios.post('/api/login', credentials)
  return res.data
}

export default { getAll, login, postNew, setToken, update }