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
import { Container, List, Message, Menu, Icon, Form, Input, Button, Segment } from 'semantic-ui-react'

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
      <Toggleable label='New...' ref={blogFormRef}>
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
      <Segment>
        <h1>Bloglist</h1>
        <Form onSubmit={login}>
          <Form.Field>
            <label>Username:</label>
            <Input {...username.spread} />
          </Form.Field>
          <Form.Field>
            <label>Password:</label>
            <Input {...password.spread} />
          </Form.Field>
          <Button type='submit'><Icon name='privacy' />Login</Button>
        </Form>
      </Segment>
    )
  }

  const blogList = () => {
    return (
      <div>
        <h2>Post new</h2>

        {blogForm()}

        <h2>Blogs</h2>
        <List divided relaxed>
          {props.blogs.sort((a, b) => {
            return (b.likes - a.likes)
          }).map(blog =>
            <List.Item key={blog.id}>
              <List.Icon name='newspaper outline' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header>
                  <Link to={`/api/blogs/${blog.id}`} >{`"${blog.title}" by ${blog.author}`}</Link>
                </List.Header>
              </List.Content>
            </List.Item>)
          }
        </List>
      </div>
    )
  }

  const navBar = () => {
    return (
      <Menu>
        <Link to='/'>
          <Menu.Item>
            <Icon name='home' />
            Home
          </Menu.Item>
        </Link>
        <Link to='/api/users'>
          <Menu.Item>
            <Icon name='users' />
            All users
          </Menu.Item>
        </Link>
        <Menu.Menu position='right'>
          <Menu.Item>
            {`logged in as ${props.user.username}`}
          </Menu.Item>
          <Menu.Item onClick={logout}>
            <Icon name='log out' />
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }

  const mainView = () => {
    const findOneBlog = (id) => {
      return props.blogs.find(b => b.id === id)
    }

    return (
      <div>
        <Router>
          <div>
            {navBar()}
            <Route exact path='/' render={() => blogList()} />
            <Route path='/api/users' render={() => <UserList />} />
            <Route exact path='/api/blogs/:id' render={({ match }) => <Blog blog={findOneBlog(match.params.id)} />} />
          </div>
        </Router>
      </div>
    )
  }

  return (
    <Container>
      <div>
        {props.notification
          ?
          <Message color='blue'>
            {`${props.notification}`}
          </Message>
          : null
        }
        {props.user === null
          ? loginform()
          : mainView()
        }

      </div>
    </Container>
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