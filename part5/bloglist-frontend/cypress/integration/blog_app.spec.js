describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users',
      { username: 'VSCodeRestClient', password: 'password', name: 'VSCode RestClient' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('#loginForm').contains('username')
    cy.get('#loginForm').contains('password')
    cy.get('#loginForm').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('VSCodeRestClient')
      cy.get('#password').type('password')
      cy.get('#loginSubmit').click()
      cy.contains('VSCode RestClient is logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('VSCodeRestClient')
      cy.get('#password').type('wrong')
      cy.get('#loginSubmit').click()

      cy.get('html').should('not.contain', 'VSCode RestClient is logged in')

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', { username: 'VSCodeRestClient', password: 'password' })
        .then(response => {
          window.localStorage.setItem('user', JSON.stringify(response.body))
        })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submitButton').click()
      cy.get('.blog').contains('test blog test author')
    })
  })
})