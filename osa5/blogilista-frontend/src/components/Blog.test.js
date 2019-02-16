import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'testtitle',
  author: 'testauthor',
  likes: 5
}

describe('Simpleblog render tests', () => {

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

describe('Simpleblog button tests', () => {
  const handler = jest.fn()

  test('if like button is clicked twice the event handler is called twice', () => {
    const { getByText } = render(<SimpleBlog blog={blog} onClick={handler} />)
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(handler.mock.calls.length).toBe(2)
  })
})