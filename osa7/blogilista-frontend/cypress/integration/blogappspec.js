const testUser = {
  username: 'TESTUSER',
  password: 'TESTPASSWORD',
  name: 'tester'
}

// Reset the database and create a test user before each test
beforeEach(() => {
  cy.clearLocalStorage()
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
  cy.request('POST', 'http://localhost:3003/api/users/', testUser)
  cy.visit('http://localhost:3000')
})

describe('Before logging in', () => {
  it('Site can be viewed', () => {
    cy.contains('Bloglist')
  })

  it('Wrong username and/or password displays error', () => {
    cy.get('input:first').type('WRONGUSER')
    cy.get('input:last').type('WRONGPASSWORD')
    cy.contains('Login').click()
  })
})

describe('After logging in', () => {
  beforeEach(() => {
    cy.get('input:first').type(testUser.username)
    cy.get('input:last').type(testUser.password)
    cy.contains('Login').click()
  })

  it('User is logged in', () => {
    cy.contains('Home')
  })

  it('User can log out', () => {
    cy.contains('Logout').click()
    cy.contains('Bloglist')
  })

  it('User can post a new blog', () => {
    cy.contains('New...').click()
    cy.get('#title').type('TESTBLOG')
    cy.get('#author').type('TESTAUTHOR')
    cy.get('#url').type('TEST.URL')
    cy.contains('submit').click()
    cy.contains('"TESTBLOG" by TESTAUTHOR')
  })
})