import React, { useState } from 'react'
import blogService from '../services/blogs'
import Toggleable from './Toggleable'

const BlogForm = ({ blogs, setBlogs, setNotification }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const blogFormRef = React.createRef()

    const postBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = await blogService.postNew({ title: title, author: author, url: url })
            setNotification('New Blog Successfully added!')
            setBlogs(blogs.concat(newBlog))
            console.log(blogs)
            setTitle('')
            setAuthor('')
            setUrl('')
            //blogFormRef.current.toggle()
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

    return (
        <Toggleable label="new..." ref={blogFormRef}>
            <form onSubmit={postBlog}>
                <p>Title:</p>
                <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
                <p>Author:</p>
                <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
                <p>URL:</p>
                <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
                <br />
                <button type="submit">submit</button>
            </form>
        </Toggleable>
    )
}

export default BlogForm