const blogs = [
  {
    id: 1,
    title: 'testblog1',
    author: 'testauthor1',
    likes: 2
  },
  {
    id: 2,
    title: 'testblog2',
    author: 'testauthor1',
    likes: 5
  },
  {
    id: 3,
    title: 'testblog3',
    author: 'testauthor2',
    likes: 265
  }
]

let token = null

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }