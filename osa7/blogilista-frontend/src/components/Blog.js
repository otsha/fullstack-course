import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const Blog = ({ deleteBlog, likeBlog, blog, currentUser }) => {
  const [show, setShow] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const showWhenTrue = { display: show ? '' : 'none' }
  const style = {
    border: 'solid',
    margin: '5px',
    padding: '5px',
    width: '33%'
  }

  const toggle = async (event) => {
    event.preventDefault()
    setShow(!show)
  }

  useEffect(() => {
    if (currentUser.id === blog.user.id) {
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
    <div style={style} className="blog">
      <div onClick={toggle} className="blogHeader">{blog.title} by {blog.author}</div>
      <div style={showWhenTrue} className="blogDetails">
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} likes</p>
        <button type="submit" onClick={handleLike}>Like this Blog!!!!!</button><br />
        {showDelete ? <button type="submit" onClick={handleDelete}>Delete</button> : ''}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  deleteBlog,
  likeBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)