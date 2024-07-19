// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('sendContact', (email, message) =>{
    cy.get('[name=categoryListboxContactUs]')
                .should('be.visible')
                .select(2)  //.select('Laptop')
    cy.get('[name=productListboxContactUs]')
                .should('be.visible')
                .select('HP ENVY - 17t Touch Laptop')
    cy.get('[name=emailContactUs]')
                .should('be.visible')
                .type(email)

    cy.get('[name=subjectTextareaContactUs]').type(message)
    cy.get('#send_btn').click()
})

Cypress.Commands.add('addSpeakersToCart', () => {
    cy.get('#speakersImg').click()
    cy.wait(4000)
    cy.contains('h3','SPEAKERS').should('be.visible')

    cy.get('[class="cell categoryRight"]> ul > :nth-child(3)').click()
    cy.wait(4000)
    cy.get('[name="save_to_cart"]').click()
    cy.get('#checkOutPopUp').should('be.visible')
})