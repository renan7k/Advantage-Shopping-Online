/// <reference types="cypress" />
describe("Validações da HOME do AdvantageShopping",() => {
    beforeEach(() => {
        cy.visit('/')
        cy.wait(10000)
    })
    it("Verificar que opções do menu estão visíveis", () => { //Teste falha se for executado com outra resolução (bug)
        cy.get('.logo > a')
            .should('be.visible')
            .and('have.attr', 'href', '#/')
        cy.get('.nav-li-Links')
            .contains('OUR PRODUCTS')
            .should('be.visible')
        cy.get('.nav-li-Links')
            .contains('SPECIAL OFFER')
            .should('be.visible')
        cy.get('.nav-li-Links')
            .contains('POPULAR ITEMS')
            .should('be.visible')
        cy.get('.nav-li-Links')
            .contains('CONTACT US')
            .should('be.visible')

        cy.get('#search').should('be.visible')
        cy.get('#menuUserLink').should('be.visible')
        cy.get('#shoppingCartLink').should('be.visible')
        cy.get('#menuHelp').should('be.visible')
        cy.get('#helpLink').should('be.visible')
    })
    it("Verificar estrutura da home ", () => {
        //Bloco de Produtos
        cy.get('#our_products').should('be.visible')
        cy.get('#speakersImg').should('be.visible')
        cy.get('#tabletsImg').should('be.visible')
        cy.get('#laptopsImg').should('be.visible')
        cy.get('#miceImg').should('be.visible')
        cy.get('#headphonesImg').should('be.visible')

        //Bloco de Special Offer
        cy.get('#special_offer_items > h3')
            .should('have.text','SPECIAL OFFER')
            .and('be.visible')
        
        cy.get('#img-special-offer').should('be.visible')
        cy.get('#div-special-offer').should('be.visible')

        //Bloco de explorer
        cy.get('[class="imgContainer"]').should('be.visible')
        cy.get('[class="imgSection"] > [class="container"] > h2')
            .should('have.text', 'ALL YOU WANT FROM A TABLET')
            //.and('be.visible')
        
        cy.get('[class="imgSection"] > [class="container"] > [name="explore_now_btn"]')
            .should('contain', 'EXPLORE NOW')
            //.and('be.visible') não está visível porque seu conteúdo está sendo cortado por um de seus elementos pai, que possui uma propriedade CSS de overflow: oculto, rolagem ou automático

        //Bloco de popular items
        cy.get('#popular_items > h3')
            .should('contain', 'POPULAR ITEMS')

        cy.get('#popular_items > [class="grid-table center"]')
            .should('be.visible')  // implementar validação da quantidade de itens exibidos
        
        //Bloco de contact us
        cy.get('#contact_us').should('be.visible')
        cy.get(':nth-child(2) > .roboto-bold')
            .should('contain', 'CONTACT US')
            .and('be.visible')

        //Bloco de follow us
        cy.get('footer.ng-scope > :nth-child(1) > h3')
            .should('be.visible')
            .and('contain', 'FOLLOW US')
        
        cy.get('#follow img[name="follow_facebook"]').should('be.visible')
        cy.get('#follow img[name="follow_facebook"]')
            .parent()  //buscando pelo elemento pai
            .should('have.attr','href',' https://www.facebook.com/MicroFocus/')

        cy.get('#follow img[name="follow_twitter"]').should('be.visible')
        cy.get('#follow img[name="follow_twitter"]')
            .parent()  //buscando pelo elemento pai
            .should('have.attr','href','https://twitter.com/MicroFocus')

        cy.get('#follow img[name="follow_linkedin"]').should('be.visible')
        cy.get('#follow img[name="follow_linkedin"]')
            .parent()  //buscando pelo elemento pai
            .should('have.attr','href','https://www.linkedin.com/company/1024?trk=tyah&trkInfo=clickedVertical%3Ashowcase%2CclickedEntityId%3A1024%2Cidx%3A2-1-2%2CtarId%3A145431482.327%2Ctas%3Ahewlett%20packard%20enterprise%20software')    
    })
    it("Verificar exibição do botão Voltar ao Topo", () => {
        cy.get('#scrollToTop').should('not.be.visible')
        cy.scrollTo('bottom')

        cy.get('#scrollToTop').should('be.visible')
    })
})