import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, setNotification}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const postBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = await blogService.postNew({ title: title, author: author, url: url })
            setNotification('New Blog Successfully added!')
            setBlogs(blogs.concat(newBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
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
    )
}

export default BlogForm