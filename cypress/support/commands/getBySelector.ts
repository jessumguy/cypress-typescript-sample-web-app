declare namespace Cypress {
    interface Chainable {
        /**
         * Gets an element with attribute [data-test=${selector}]
         * @param selector value of the data-test attribute
         * @example cy.getBySelector('username') gets the elements with ['data-test=username']
         */
        getBySelector(selector: string): Chainable<any>
    }
}

Cypress.Commands.add("getBySelector", (selector: string, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args)
})