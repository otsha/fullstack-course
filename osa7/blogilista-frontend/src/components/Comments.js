import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { commentBlog, initBlogs } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Button, Input, Form } from 'semantic-ui-react'

const Comments = ({ setNotification, commentBlog, blog }) => {
  const [content, setContent] = useState('')

  const handleNewComment = (event) => {
    event.preventDefault()
    try {
      commentBlog({ content: content, blog: blog })
      setNotification('Comment added!')
      setContent('')
    } catch (exception) {
      setNotification('Something went wrong, please try again.')
      console.log(exception.message)
    }
  }

  return (
    <div>
      <h2>Comments</h2>
      <Form onSubmit={handleNewComment}>
        <Form.Field>
          <label>Post a comment...</label>
          <Input type='text' value={content} onChange={({ target }) => setContent(target.value)} />
          <Button type='submit'>Send</Button>
        </Form.Field>
      </Form>
      <ul>
        {blog.comments.map(c => <li key={c.id}>{c.content}</li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  commentBlog,
  initBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)