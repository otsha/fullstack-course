
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const login = async (credentials) => {
  const res = await axios.post('/api/login', credentials)
  return res.data
}

export default { getAll, login }