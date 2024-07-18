/// <reference types="cypress" />
import { fakerPT_BR as faker } from '@faker-js/faker';

describe("Fale conosco", () => {
    beforeEach(() => {
        cy.visit('/')
        cy.wait(10000)
    })
    context('Envio de contato com sucesso', () => { 
        it('Preenchimento de todos os campos e envio com sucesso', () => { // Teste utilizando comando customizado, enviando 2 váriáveis
            cy.sendContact('tr@outlook.com','Notebook chegou sem bateria')

            cy.get('#registerSuccessCover')
                .should('be.visible')
                .and('contain', 'Thank you for contacting Advantage support.')
            cy.get('.a-button')
                .contains('CONTINUE SHOPPING')
                .should('be.visible')
        })

        it('Verificando que apenas os campos email e mensagem são mandatórios', () => { //Teste utilizando biblioteca FAKER, para geração de dados
            cy.get('[name=emailContactUs]')
                .should('be.visible')
                .type(faker.internet.email())
            cy.get('[name=subjectTextareaContactUs]').type(faker.random.words())  //faker.word.words()
            cy.get('#send_btn').click()

            cy.get('#registerSuccessCover')
                .should('be.visible')
                .and('contain', 'Thank you for contacting Advantage support.')
            cy.get('.a-button')
                .contains('CONTINUE SHOPPING')
                .should('be.visible')
        })
    })
    context('Validação dos campos', () => {
        it('Botão SEND desabilitado sem o preenchimento dos campos', () => {
            cy.get('#send_btn')
                .should('be.visible')
                .and('be.disabled')
        })
        it('Validar mensagem de obrigatoriedade do email e assunto', () => {
            cy.get('[name=emailContactUs]').click()
            cy.get('[name=subjectTextareaContactUs]').click()

            cy.contains('Email field is required').should('be.visible')
            cy.contains('Subject field is required').should('be.visible') //Bug, a literal da msg deveria ser outra
        })
        it('Validar botão enviar desabilitado quando email não estiver preenchido', () => {
            cy.get('[name=subjectTextareaContactUs]').type('O notebook chegou com a tela trincada')
            cy.get('#send_btn')
                .should('be.visible')
                .and('be.disabled')
        })
        it('Validar botão enviar desabilitado quando assunto não estiver preenchido', () => {
            cy.get('[name=emailContactUs]').type('geraldo@gmail.com')
            cy.get('#send_btn')
                .should('be.visible')
                .and('be.disabled')
        })
        it('Validar necessidade de @ e . no campo email', () => {
            cy.get('[name=emailContactUs]').type('abnergmail.com')
            cy.get('[name=subjectTextareaContactUs]').type('O notebook chegou com a tela trincada')
            cy.get('#send_btn').click()

            cy.contains('Invalid e-mail address.').should('be.visible')
            //cy.get('.invalid center')
               // .should('contain', 'Invalid e-mail address.')

            cy.get('[name=emailContactUs]').type('abner@gmailcom')
            cy.get('#send_btn').click()

            cy.contains('Invalid e-mail address.').should('be.visible')
            //cy.get('.secForm > .invalid').should('contains', 'Invalid e-mail address.')
        })


    })
    context('Validação do chat', () => {
        it.skip('Verificar redirecionamento para o chat', () => {
            cy.get('#chatLogo')
                .invoke('removeAttr', 'target') //Removendo atributo que abre uma nova aba com o chat
                .click()

            //Chat está sendo aberto em uma nova janela, PENDENTE de como solucionar para abrir na mesma janela e aba <<<<<<<<<<<<<<<<<<<<<<
            cy.url().should('be.equal','https://advantageonlineshopping.com/chat.html')
        })

    })

})