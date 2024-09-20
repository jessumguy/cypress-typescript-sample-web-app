const usersLoginDetails = require('../fixtures/login_details.json')

describe('attempt login without inputting username', () => {
    beforeEach(() => {
        cy.visit('/')
        
    });

    it(`displays error "Username is required"`, () => {
        cy.get('[data-test="login-button"]')
          .click()

        cy.get('[data-test="error"]')
          .should('be.visible')
          .and('have.text', 'Epic sadface: Username is required')
    });
});

describe('attempt to login with only username input', () => {
    beforeEach(() => {
        cy.visit('/')
        
    });

    it(`displays error "Password is required"`, () => {
        const randomUser = Cypress._.sample(usersLoginDetails);

        cy.get('[data-test="username"]')
          .type(randomUser.username)

        cy.get('[data-test="login-button"]')
          .click()

        cy.get('[data-test="error"]')
          .should('be.visible')
          .and('have.text', 'Epic sadface: Password is required')
    });
});


describe('attempt to login with incorrect username and/or password', () => {
    beforeEach(() => {
        cy.visit('/')
        
    });

    it(`displays error "Username and password do not match any user in this service`, () => {
        const createRandomId = () => Cypress._.random(0, 1e6);
        const username = `username${createRandomId()}`
        const password = `password${createRandomId()}`
        
        cy.get('[data-test="username"]')
          .type(username)

        cy.get('[data-test="password"]')
          .type(password)

        cy.get('[data-test="login-button"]')
          .click()

        cy.get('[data-test="error"]')
          .should('be.visible')
          .and('have.text', 'Epic sadface: Username and password do not match any user in this service')
    });
});

describe('attempt to login with correct username and password', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('login is successful', () => {
        const randomUser = Cypress._.sample(usersLoginDetails);
      
        cy.get('[data-test="username"]')
          .type(randomUser.username)

        cy.get('[data-test="password"]')
          .type(randomUser.password)

        cy.get('[data-test="login-button"]')
          .click()
        
        cy.url().should('contain', '/inventory.html')
    });
});

describe('UI - able to log in and log out successfully', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test="username"]')
      .type('standard_user')
    cy.get('[data-test="password"]')
      .type('secret_sauce')
    cy.get('[data-test="login-button"]')
      .click()
    cy.url().should('contain', '/inventory.html')
  });
  
  it('able to log out from the burger menu > logout', () => {
    cy.get('#react-burger-menu-btn')
      .should('be.visible')
      .click()

    cy.get('.bm-item-list')
      .find('[data-test="logout-sidebar-link"]')
      .should('be.visible')
      .click()
    
    cy.url().should('contain', 'http://localhost:3000/')
  });
});

describe('Custom Commmand - able to log in and log out successfully', () => {
  beforeEach(() => {
    cy.login('standard_user', 'secret_sauce')
  });
  
  it('able to log out from the burger menu > logout', () => {
    cy.get('#react-burger-menu-btn')
      .should('be.visible')
      .click()

    cy.get('.bm-item-list')
      .find('[data-test="logout-sidebar-link"]')
      .should('be.visible')
      .click()
    
    cy.url().should('contain', 'http://localhost:3000/')
  });
});

// - With only username input
// - With only password input
// - With incorrect input
// - With correct input  
// - With correct input - Using Custom Command login()