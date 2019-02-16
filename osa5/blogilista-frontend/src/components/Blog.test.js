import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
import Blog from './Blog'

const blog = {
  title: 'testtitle',
  author: 'testauthor',
  likes: 5,
  id: 1
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

describe('Blog render tests', () => {
  const handler = jest.fn()
  const mockUser = {
    id: 1
  }

  test('by default only title and author are shown', () => {
    const component = render(<Blog blog={blog} currentUser={mockUser} />)
    const header = component.container.querySelector('.blogHeader')
    const body = component.container.querySelector('.blogDetails')

    expect(header).toHaveTextContent('testauthor')
    expect(header).toHaveTextContent('testtitle')
    expect(header).not.toHaveTextContent('Like this Blog!!!!!')
    expect(body).toHaveStyle('display: none')
  })

  test('details can be made visible by clicking on the header', () => {
    const component = render(<Blog blog={blog} currentUser={mockUser} />)
    const header = component.container.querySelector('.blogHeader')
    const body = component.container.querySelector('.blogDetails')

    fireEvent.click(header)
    expect(body).not.toHaveStyle('display: none')
  })
})