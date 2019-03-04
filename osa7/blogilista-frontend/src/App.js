import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { postBlog, initBlogs } from './reducers/blogReducer'
import { userLogin, userLogout } from './reducers/currentUserReducer'
import { connect } from 'react-redux'
import UserList from './components/UserList'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    props.initBlogs()
  }, [])

  useEffect(() => {
    setNotification(props.notification)
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('currentUser')
    const user = JSON.parse(userJSON)
    if (user && user.token) {
      props.userLogin(user)
    }
  }, [])

  const login = async (event) => {
    event.preventDefault()
    try {
      const usernameAsString = username.value
      const passwordAsString = password.value
      const user = await blogService.login({ username: usernameAsString, password: passwordAsString })
      props.userLogin(user)
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
      props.postBlog({ title: title, author: author, url: url })
      props.setNotification('New Blog Successfully added!')
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
      props.userLogout()
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


  const blogList = () => {
    return (
      <div>
        <h2>Post new</h2>

        {blogForm()}

        <h2>blogs</h2>

        {props.blogs.sort((a, b) => {
          return (b.likes - a.likes)
        }).map(blog => <Blog key={blog.id} blog={blog} />)
        }
      </div>
    )
  }

  const mainView = () => {
    return (
      <div>
        <Router>
          <div>
            <Link to='/'>Home</Link>
            <Link to='/api/users'>All users</Link>
            <p>{`logged in as ${props.user.username}`}</p>
            <button type='submit' onClick={logout}>Logout</button>
            <Route exact path='/' render={() => blogList()} />
            <Route path='/api/users' render={() => <UserList />} />
          </div>
        </Router>
      </div>
    )
  }

  return (
    <div>
      <div>
        {`${props.notification}`}

      </div>
      {props.user === null
        ? loginform()
        : mainView()
      }

    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state.notification)
  console.log(state.blogs)
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user
  }
}


const mapDispatchToProps = {
  setNotification,
  postBlog,
  initBlogs,
  userLogin,
  userLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)