describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('#loginForm').contains('username')
    cy.get('#loginForm').contains('password')
    cy.get('#loginForm').contains('login')
  })
})