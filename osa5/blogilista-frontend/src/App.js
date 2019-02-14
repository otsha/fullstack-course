import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('currentUser')
    const user = JSON.parse(userJSON)
    if (user && user.token) {
      setUser(user)
      blogService.setToken(user.token)
    }
  })

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await blogService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('currentUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Invalid username or password!')
      console.log(exception.message)

      setTimeout(() => {
        setNotification('')
      }, 4000)
    }
  }

  const postBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current()

    try {
      const newBlog = await blogService.postNew({ title: title, author: author, url: url })
      setNotification('New Blog Successfully added!')
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setNotification('')
      }, 4000)
    } catch (exception) {
      console.log(exception.message)
      setNotification('Something went wrong, please try again.')
      setTimeout(() => {
        setNotification('')
      }, 4000)
    }
  }

  const blogFormRef = React.createRef()

  const blogForm = () => {
    const values = {
      title: title,
      author: author,
      url: url
    }

    return (
      <Toggleable label='new...' ref={blogFormRef}>
        <BlogForm action={postBlog} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} values={values} />
      </Toggleable>
    )
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
          <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          <button type='submit'>Login</button>
        </div>
      </form>
    )
  }

  const mainView = () => {
    return (
      <div>
        <h2>Post new</h2>

        {blogForm()}

        <h2>blogs</h2>
        <p>{`logged in as ${user.username}`}</p>
        <button type='submit' onClick={logout}>Logout</button>

        {blogs.sort((a, b) => {
          return (b.likes - a.likes)
        }).map(blog =>
          <Blog key={blog.id} blog={blog} currentUser={user} blogs={blogs} setBlogs={setBlogs} />
        )}
      </div>
    )
  }

  return (
    <div>
      <div>
        {`${notification}`}

      </div>
      {user === null
        ? loginform()
        : mainView()
      }

    </div>
  )
}

export default App