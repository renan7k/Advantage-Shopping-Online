/// <reference types="cypress" />
describe("Modal de login", () =>{
    beforeEach(() => {
        cy.visit('/')
    })
    it("Verificar realização de login com sucesso", () => { 
    //Teste utilziando o comando customizado, e as váriáveis definidas no arquivo Cypress.env , que por questão de segurança, pode ser incluído no gitIgnore e não compartilhado
        cy.intercept('POST', '/accountservice/ws/AccountLoginRequest').as('loginRequest')
        cy.login(Cypress.env('username'), Cypress.env('password'))

        cy.wait('@loginRequest').then(interception => {
            expect(interception.response.statusCode).to.equal(200)
        
        cy.get('#menuUserLink > span')
            .should('contain' ,Cypress.env('username'))
            .and('be.visible')
        })
    })  
    it.only("Verificar mensagens de erro ao deixar os campos usuário e senha vazios ", () => {
        cy.get('#menuUserLink').click()
        cy.get('[a-hint="Username"] > .inputContainer > [name="username"]')
            .focus()
            .blur()

        cy.get('[a-hint="Username"] > .inputContainer > label.invalid')
            .should('be.visible')
            .and('have.text', 'Username field is required')
        
        cy.get('[a-hint="Password"] > .inputContainer > label.invalid').should('not.exist') //Só exibido quando o cursor vai para outro elemento
        
        // cy.log('Foco no campo senha')
        // cy.log('Foco no campo usuário')
        cy.get('[a-hint="Password"] > .inputContainer > [name="password"]')
            .focus()
            .blur()

        cy.get('[a-hint="Password"] > .inputContainer > label.invalid')
            .should('be.visible')
            .and('have.text', 'Password field is required')

        cy.get('[a-hint="Username"] > .inputContainer > label.invalid').should('be.visible')

        cy.log('Foco no checkbox')
        cy.get('[name="remember_me"]').check()
        cy.get('[a-hint="Username"] > .inputContainer > label.invalid').should('be.visible')
        cy.get('[a-hint="Password"] > .inputContainer > label.invalid').should('be.visible')
    })
    it("Verificar que o botão SIGN IN permanece desabilitado sem o preenchimento dos campos obrigatórios", () => {
        cy.get('#menuUserLink').click()
        cy.get('#sign_in_btn').should('be.disabled')

        cy.log('Apenas o usuário preenchido')
        cy.get('[a-hint="Username"] > .inputContainer > [name="username"]').type("Gláucia")
        cy.get('#sign_in_btn').should('be.disabled')

        cy.log('Apenas a senha preenchida')
        cy.get('[a-hint="Username"] > .inputContainer > [name="username"]').clear()
        cy.get('[a-hint="Password"] > .inputContainer > [name="password"]').type("Teste123")
        cy.get('#sign_in_btn').should('be.disabled')
    }) 
    it("Verificar que o botão SIGN IN fica habilitado após preenchimento de usuário e senha ", () => {
        cy.get('#menuUserLink').click()
        cy.get('[a-hint="Username"] > .inputContainer > [name="username"]').type("Gláucia")
        cy.get('[a-hint="Password"] > .inputContainer > [name="password"]').type("Teste123")
        cy.get('#sign_in_btn').should('not.be.disabled')
    })
    it("Verificar tentativa de login com usuário não cadastrado", () => { //Validar mensagem de erro e retorno da api (XML)
        cy.get('#menuUserLink').click()
        cy.intercept('POST', '/accountservice/ws/AccountLoginRequest').as('loginRequest')

        cy.get('[a-hint="Username"] > .inputContainer > [name="username"]').type("Gláucia")
        cy.get('[a-hint="Password"] > .inputContainer > [name="password"]').type("Teste123")
        cy.get('#sign_in_btn').click()

        cy.get('#signInResultMessage')
            .should('be.visible')
            .and('have.text','Incorrect user name or password.')

        cy.wait('@loginRequest').then(interception => {
            expect(interception.response.statusCode).to.equal(200)

            const xmlResponse = interception.response.body

            expect(xmlResponse).to.contain('<ns2:success>false</ns2:success>')
            expect(xmlResponse).to.contain('<ns2:reason>Incorrect user name or password.</ns2:reason>')
        })
    })
    it("Verificar redirecionamento para tela de cadastro após clique no botão CREATE NEW ACCOUNT", () => {
        cy.get('#menuUserLink').click()
        cy.get('.create-new-account').click()

        cy.url().should('be.equal','https://advantageonlineshopping.com/#/register')

        cy.get('#registerPage > article > h3')
            .should('be.visible')
            .and('have.text','CREATE ACCOUNT')
    })

    it("Verificar mensagem de erro quando api retornar 500 ", () => { //Utilização de stub
        cy.intercept('POST', '/accountservice/ws/AccountLoginRequest', {
            statusCode:500, }).as('stubLoginRequest')
        
        cy.login(Cypress.env('username'), Cypress.env('password'))
        cy.get('#signInResultMessage')
            .should('be.visible')
            .and('have.text','Login failed. Please try again later.')
    })
})