import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('currentUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
    }
  })

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await blogService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('currentUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.setItem('currentUser', null)
      setUser(null)
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const loginform = () => {
    return (
      <form onSubmit={login}>
        <div>
          <p>Username:</p>
          <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} />
          <p>Password:</p>
          <input type='text' value={password} onChange={({ target }) => setPassword(target.value)} />
          <button type='submit'>Login</button>
        </div>
      </form>
    )
  }

  const mainView = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{`logged in as ${user.username}`}</p>
        <button type='subit' onClick={logout}>Logout</button>

        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
    )
  }

  return (
    <div>

      {user === null
        ? loginform()
        : mainView()
      }

    </div>
  )
}

export default App