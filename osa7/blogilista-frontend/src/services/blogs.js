
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

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
  const config = { headers: { Authorization: token } }
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return res.data
}

const remove = async blog => {
  const config = { headers: { Authorization: token } }
  const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return res.data
}

const login = async (credentials) => {
  const res = await axios.post('http://localhost:3003/api/login', credentials)
  return res.data
}

const getAllUsers = async () => {
  const req = axios.get('http://localhost:3003/api/users')
  return req.then(res => res.data)
}

const postComment = async newComment => {
  const config = { headers: { Authorization: token } }
  const res = await axios.post(`${baseUrl}/${newComment.blog.id}/comments`, newComment, config)
  return res.data
}

export default { getAll, getAllUsers, login, postNew, postComment, setToken, update, remove }