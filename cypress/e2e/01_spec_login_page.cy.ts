describe('login page displays the page title, username and password input fields and login button', () => {

  beforeEach(() => {
    cy.visit('/')
  });
  it('dislays page title', () => {
    cy.get('.login_logo')
      .should('be.visible')
      .and('have.text', 'Swag Labs')
  })

  it('displays username and password input fields with placeholder', () => {
    cy.getBySelector('username')
      .should('have.attr', 'type', 'text')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Username')
    
    cy.getBySelector('password')
      .should('have.attr', 'type', 'password')
      .should('be.visible')
      .should('have.attr', 'placeholder', 'Password')
  })

  it('displays login button', () => {
    cy.getBySelector('login-button')
      .should('have.attr', 'type', 'submit')
      .should('be.visible')
      .and('have.value', 'Login')
  })
});
