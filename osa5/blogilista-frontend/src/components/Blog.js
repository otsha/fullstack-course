import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, currentUser, blogs, setBlogs }) => {
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
    if (currentUser.id === blog.user) {
      setShowDelete(true)
    }
  })

  const handleLike = (event) => {
    event.preventDefault()
    try {
      blog.likes = blog.likes + 1
      blogService.update(blog)
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`Do you really wish to delete ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
    } catch (exception) {
      console.log(exception.message)
    }
  }

  return (
    <div style={style}>
      <div onClick={toggle}>{blog.title} by {blog.author}</div>
      <div style={showWhenTrue}>
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
  currentUser: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog