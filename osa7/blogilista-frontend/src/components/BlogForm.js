import React from 'react'

const BlogForm = ({ action, setTitle, setAuthor, setUrl, values }) => {

  return (
    <form onSubmit={action}>
      <p>Title:</p>
      <input type="text" value={values.title} onChange={({ target }) => setTitle(target.value)} />
      <p>Author:</p>
      <input type="text" value={values.author} onChange={({ target }) => setAuthor(target.value)} />
      <p>URL:</p>
      <input type="text" value={values.url} onChange={({ target }) => setUrl(target.value)} />
      <br />
      <button type="submit">submit</button>
    </form>
  )
}

export default BlogForm