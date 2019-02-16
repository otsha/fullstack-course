import React from 'react'
import { render, fireEvent, testHook } from 'react-testing-library'
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
})