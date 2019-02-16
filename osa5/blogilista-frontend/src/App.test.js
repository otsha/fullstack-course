import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('App integration tests', () => {
  test('Only login form is shown if no user is logged in', async () => {
    const component = render(<App />)
    // at this point no one is logged in
    expect(component.container).toHaveTextContent('Username:')
    expect(component.container).toHaveTextContent('Password:')
    // the blog list header is only shown is someone is logged in, so we can simply test that
    expect(component.container).not.toHaveTextContent('blogs')
  })

  test('Blogs are rendered if a user is logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('currentUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelectorAll('.blog')
    )

    expect(component.container).toHaveTextContent('blogs')
    expect(component.container).toHaveTextContent('testblog1')
    expect(component.container).toHaveTextContent('testblog2')
    expect(component.container).toHaveTextContent('testblog3')

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)
  })
})