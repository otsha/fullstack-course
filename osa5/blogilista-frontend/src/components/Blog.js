import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)

  const showWhenTrue = { display: show ? '' : 'none' }
  const style = {
    border: 'solid',
    margin: '5px',
    padding: '5px',
    width: '33%'
  }

  const toggle = () => {
    setShow(!show)
  }

  const handleLike = (event) => {
    event.preventDefault()
    try {
      blog.likes = blog.likes + 1
      blogService.update(blog)
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
        <button type="submit" onClick={handleLike}>Like this Blog!!!!!</button>
      </div>
    </div>
  )
}

export default Blog