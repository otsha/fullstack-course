import React, { useState, useEffect } from 'react'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const Blog = ({ deleteBlog, likeBlog, blog, currentUser, users }) => {
  if (blog === undefined) {
    return null
  }

  const [showDelete, setShowDelete] = useState(false)

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
    <div className="blog">
      <h1 className="blogHeader">{blog.title} by {blog.author}</h1>
      <div className="blogDetails">
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} likes</p>
        <button type="submit" onClick={handleLike}>Like this Blog!!!!!</button><br />
        {showDelete ? <button type="submit" onClick={handleDelete}>Delete</button> : ''}
      </div>
      <div>
        <h2>Comments</h2>
        <ul>
          {blog.comments.map(c => <li key={c.id}>{c.content}</li>)}
        </ul>
      </div>
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