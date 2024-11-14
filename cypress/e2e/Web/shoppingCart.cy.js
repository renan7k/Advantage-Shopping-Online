/// <reference types="cypress" />
describe("Funcionalidades do carrinho", () => {
    beforeEach(() => {
        cy.visit('/')
        cy.wait(10000)
    })
    it.skip("Verificar fluxo de compra de produto com cartão Mastercard", () => {
        cy.login(Cypress.env('username'), Cypress.env('password'))
        cy.add2MicersToCart()
        cy.get('#shoppingCartLink').click()

        cy.get('#checkOutButton').click()
        cy.get('#next_btn').click()
        cy.get('#pay_now_btn_MasterCredit').click()

        cy.get('#orderPaymentSuccess > h2 > span').should('be.visible').and('contain','Thank you for buying with Advantage')
        cy.get('#orderPaymentSuccess > .roboto-regular.ng-binding').should('be.visible').and('contain',' Your tracking number is ')
        cy.get('#orderPaymentSuccess > .roboto-regular.ng-binding').should('be.visible').and('contain',' Your order number is ')
    })
    it("Verificar mensagem quando o único produto for removido do carrinho", () => {
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
    context("Tela de login dentro do fluxo do Carrinho", () => {
        it("Verificar que dados de acesso são solicitados quando cliente não está logado ", () => {
            cy.addSpeakersToCart()
            cy.get('#shoppingCartLink').click()
            cy.get('#checkOutButton').click()

            cy.get('.noUserSection > label').should('be.visible').and('contain','Already have an account?')
            cy.get('#newClient')
                .should('be.visible')
                .and('contain','New user?')
        })
        it("Verificar mensagens de erro ao deixar os campos usuário e senha vazios no fluxo do carrinho", () => {
            cy.addSpeakersToCart()
            cy.get('#shoppingCartLink').click()
            cy.get('#checkOutButton').click()

            cy.log("Mensagem de erro do campo user")
            cy.get('[name="usernameInOrderPayment"]').click()
            cy.get('[name="passwordInOrderPayment"]').click()
            cy.get('[a-hint="Username"] > .inputContainer > label.invalid').should('be.visible').and('have.text', 'Username field is required')

            cy.log("Mensagem de erro do campo password")
            cy.get('[name="usernameInOrderPayment"]').click()
            cy.get('[a-hint="Password"] > .inputContainer > label.invalid').should('be.visible').and('have.text', 'Password field is required')

            cy.log("Mensagem de erro nos 2 campos")
            cy.get('#registration_btn').focus()
            cy.get('[a-hint="Username"] > .inputContainer > label.invalid').should('be.visible').and('have.text', 'Username field is required')
            cy.get('[a-hint="Password"] > .inputContainer > label.invalid').should('be.visible').and('have.text', 'Password field is required')
        })
    })
    
})