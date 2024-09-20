declare namespace Cypress {
    interface Chainable {
        /**
         * Logs in with a given user
         * @param username username of the user
         * @param password password of the user
         * @example cy.login('standard_user', 'secret_sauce')
         */
        login(username: string, password: string): Chainable<any>
    }
}  

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('/')
    cy.get('[data-test="username"]')
      .type(username)
    cy.get('[data-test="password"]')
      .type(password)
    cy.get('[data-test="login-button"]')
      .click()
    cy.url().should('contain', '/inventory.html')
})