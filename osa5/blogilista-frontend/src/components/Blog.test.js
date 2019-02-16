import React from 'react'
import { render } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('Simpleblog render tests', () => {
  const blog = {
    title: 'testtitle',
    author: 'testauthor',
    likes: 5
  }

  test('blog title is rendered', () => {
    const component = render(<SimpleBlog blog={blog} />)
    expect(component.container).toHaveTextContent('testtitle')
  })

  test('blog author is rendered', () => {
    const component = render(<SimpleBlog blog={blog} />)
    expect(component.container).toHaveTextContent('testauthor')
  })

  test('blog likes are rendered', () => {
    const component = render(<SimpleBlog blog={blog} />)
    expect(component.container).toHaveTextContent('5')
  })
})