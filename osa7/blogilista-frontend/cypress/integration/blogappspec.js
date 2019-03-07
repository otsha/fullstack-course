const testUser = {
  username: 'TESTUSER',
  password: 'TESTPASSWORD',
  name: 'tester'
}

const testUser2 = {
  username: 'TESTUSER2',
  password: 'OTHERTESTPASSWORD',
  name: 'second tester'
}

// Reset the database and create test users before each test
beforeEach(() => {
  cy.clearLocalStorage()
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
  cy.request('POST', 'http://localhost:3003/api/users/', testUser)
  cy.request('POST', 'http://localhost:3003/api/users/', testUser2)
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

  it('User can view and hide the blog form', () => {
    cy.contains('New...').click()
    cy.contains('submit')
    cy.contains('Hide').click()
    !cy.contains('submit')
  })

  describe('After posting a blog', () => {
    beforeEach(() => {
      cy.contains('New...').click()
      cy.get('#title').type('TESTBLOG')
      cy.get('#author').type('TESTAUTHOR')
      cy.get('#url').type('TEST.URL')
      cy.contains('submit').click()
    })

    it('A notification is shown', () => {
      cy.contains('New Blog Successfully added!')
    })

    it('The blog can be seen on the list', () => {
      cy.contains('"TESTBLOG" by TESTAUTHOR')
    })

    it('Another user cannot delete the blog', () => {
      cy.contains('Logout').click()
      cy.get('input:first').type(testUser2.username)
      cy.get('input:last').type(testUser2.password)
      cy.contains('Login').click()
      cy.contains('"TESTBLOG" by TESTAUTHOR').click()
      cy.contains('Delete').should('not.exist')
    })

    describe('When viewing said blog', () => {
      beforeEach(() => {
        cy.contains('"TESTBLOG" by TESTAUTHOR').click()
      })

      it('User can like the blog', () => {
        cy.contains('Like!').click()
        cy.contains('1')
      })

      it('User can delete their blog', () => {
        cy.contains('Delete').click()
        cy.contains('Home').click()
        cy.contains('"TESTBLOG" by TESTAUTHOR').should('not.exist')
      })

      it('User can comment on the blog', () => {
        cy.get('input:first').type('TESTCOMMENT')
        cy.contains('Send').click()
        cy.contains('TESTCOMMENT')
      })
    })
  })

  it('User can view a list of all users', () => {
    cy.contains('All users').click()
    cy.contains('Users')
    cy.contains('TESTUSER')
    cy.contains('TESTUSER2')
  })

  it('User can view the details of a single user', () => {
    cy.contains('All users').click()
    cy.get('#TESTUSER2').click()
    cy.contains('TESTUSER2')
    cy.contains('second tester')
  })
})