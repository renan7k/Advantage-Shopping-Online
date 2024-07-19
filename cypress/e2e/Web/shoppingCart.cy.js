/// <reference types="cypress" />
describe("Funcionalidades do carrinho", () => {
    beforeEach(() => {
        cy.visit('/')
        cy.wait(10000)
    })

    it("Limpar carrinho", () => {
        cy.addSpeakersToCart()
        cy.get('#shoppingCartLink').click()
        cy.get('.actions')
            .contains('REMOVE')
            .click()

        cy.get('.bigEmptyCart > .roboto-bold')
            .should('be.visible')
            .and('contain','Your shopping cart is empty')
        cy.get('.a-button')
            .should('be.visible')
            .and('contain','CONTINUE SHOPPING')
    })

})