
describe('Before logging in', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
  })

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
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
    cy.get('input:first').type('TESTER3')
    cy.get('input:last').type('joulupukki')
    cy.contains('Login').click()
  })

  it('User is logged in', () => {
    cy.contains('Home')
  })

  it('User can log out', () => {
    cy.contains('Logout').click()
    cy.contains('Bloglist')
  })
})