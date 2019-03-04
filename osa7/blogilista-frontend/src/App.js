import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [notification, setNotification] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    setNotification(props.notification)
  })

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
      const usernameAsString = username.value
      const passwordAsString = password.value
      const user = await blogService.login({ username: usernameAsString, password: passwordAsString })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('currentUser', JSON.stringify(user))
      username.reset()
      password.reset()
    } catch (exception) {
      props.setNotification('Invalid username or password!')
      console.log(exception.message)
    }
  }

  const postBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current()

    try {
      const newBlog = await blogService.postNew({ title: title, author: author, url: url })
      props.setNotification('New Blog Successfully added!')
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception.message)
      props.setNotification('Something went wrong, please try again.')
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
          <input {...username.spread} />
          <p>Password:</p>
          <input {...password.spread} />
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

const mapStateToProps = (state) => {
  return {
    notification: state
  }
}


const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(App)