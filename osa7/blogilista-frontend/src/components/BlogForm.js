import React from 'react'
import { Button, Input, Form } from 'semantic-ui-react'

const BlogForm = ({ action, setTitle, setAuthor, setUrl, values }) => {

  return (
    <Form onSubmit={action}>
      <Form.Field>
        <label>Title:</label>
        <Input id='title' type="text" value={values.title} onChange={({ target }) => setTitle(target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Author:</label>
        <Input id='author' type="text" value={values.author} onChange={({ target }) => setAuthor(target.value)} />
      </Form.Field>
      <Form.Field>
        <label>URL:</label>
        <Input id='url' type="text" value={values.url} onChange={({ target }) => setUrl(target.value)} />
      </Form.Field>
      <Button color='blue' type="submit">submit</Button>
    </Form>
  )
}

export default BlogForm