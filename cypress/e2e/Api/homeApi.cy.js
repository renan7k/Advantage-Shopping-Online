/// <reference types="cypress" />
describe("Testes das api's da home do AdvantageShopping", () => {
   context('', () => {
   
    it('API Categories', () => {
        cy.api({
            method: 'GET',
            url: 'https://advantageonlineshopping.com/catalog/api/v1/categories'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).is.not.empty
            expect(response.body).have.length(5)
           
            //Pendente de implementar uma validação  para os 5 itens do array retornados na api sem repetir as validações
            expect(response.body[0]).to.have.property('categoryId')
            expect(response.body[0]).to.have.property('categoryName')
            expect(response.body[0]).to.have.property('managedImageId')
            expect(response.body[0]).to.have.property('products')

            expect(response.body[1]).to.have.property('categoryId')
            expect(response.body[1]).to.have.property('categoryName')
            expect(response.body[1]).to.have.property('managedImageId')
            expect(response.body[1]).to.have.property('products')

            expect(response.body[2]).to.have.property('categoryId')
            expect(response.body[2]).to.have.property('categoryName')
            expect(response.body[2]).to.have.property('managedImageId')
            expect(response.body[2]).to.have.property('products')
            
        })
    })
    it("API dealOfTheDay", () => {
        cy.api({
            method: 'GET',
            url: 'https://advantageonlineshopping.com/catalog/api/v1/deals/search?dealOfTheDay=true'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).is.not.empty
            expect(response.body).have.length(1)
            //validando se existe atributos
            expect(response.body[0]).to.have.property('dealType')
            expect(response.body[0]).to.have.property('description')
            expect(response.body[0]).to.have.property('discount')
            expect(response.body[0]).to.have.property('id')
            expect(response.body[0]).to.have.property('product')
            expect(response.body[0]).to.have.property('promotionHeader')
            expect(response.body[0]).to.have.property('promotionSubHeader')
            expect(response.body[0]).to.have.property('staringPrice')

            //validando preenchimento dos atributos
            expect(response.body[0].promotionHeader).to.be.equal('EXPLORE THE NEW DESIGN')
            expect(response.body[0].promotionSubHeader).to.be.equal('Supremely thin, yet incredibly durable')
            expect(response.body[0].product.productName).to.be.equal('HP Pavilion 15z Touch Laptop')
            expect(response.body[0].product.price).to.be.equal(449.99)
        })
    })
   })
} )
