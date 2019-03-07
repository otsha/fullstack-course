import React, { useState, useEffect } from 'react'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import Comments from './Comments'
import { Button, Icon, Label, Segment } from 'semantic-ui-react'

const Blog = ({ deleteBlog, likeBlog, blog, currentUser }) => {
  if (blog === undefined) {
    return null
  }

  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    console.log(currentUser)
    console.log(blog)
    if (currentUser.id === blog.user || currentUser.id === blog.user.id) {
      setShowDelete(true)
    }
  }, [])

  const handleLike = (event) => {
    event.preventDefault()
    try {
      likeBlog(blog)
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`Do you really wish to delete ${blog.title} by ${blog.author}?`)) {
        deleteBlog(blog)
      }
    } catch (exception) {
      console.log(exception.message)
    }
  }

  return (
    <div className="blog">
      <Segment>
        <h1 className="blogHeader">{blog.title} by {blog.author}</h1>
        <div className="blogDetails">
          <p><a href={blog.url}>{blog.url}</a></p>
          {showDelete ? <Button color='red' onClick={handleDelete}><Icon name='delete' />Delete</Button> : ''}
        </div>
      </Segment>
      <div>
        <Button as='div' labelPosition='right' onClick={handleLike}>
          <Button color='red'>
            <Icon name='heart' />
            Like!
          </Button>
          <Label basic color='red' pointing='left'>
            {blog.likes}
          </Label>
        </Button>
      </div>
      <Segment>
        <Comments blog={blog} />
      </Segment>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    currentUser: state.user,
    users: state.allUsers
  }
}

const mapDispatchToProps = {
  deleteBlog,
  likeBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)