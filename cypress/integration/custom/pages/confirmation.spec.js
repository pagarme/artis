import { openCustomWithParams } from '../../../helpers/custom'

describe('Pagarme', () => {
  describe('Custom', () => {
    describe('Pages', () => {
      describe('Confirmation', () => {
        const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const transaction = {
            amount: 10000,
            }

            const customer = {
            name: 'Dan Abramov',
            documentNumber: '19981596639',
            email: 'mercurio@pagar.me',
            phoneNumber: '1130442277',
            allowedDocuments: ['CPF', 'CNPJ'],
            }

            const billing = {
            street: 'Rua Fidêncio Ramos',
            number: '308',
            additionalInfo: 'Pagar.me',
            neighborhood: 'Vila Olimpia',
            city: 'São Paulo',
            state: 'SP',
            zipcode: '04551010',
            }

            const shipping = {
            street: 'Rua Fidêncio Ramos',
            number: '308',
            additionalInfo: 'Pagar.me',
            neighborhood: 'Vila Olimpia',
            city: 'São Paulo',
            state: 'SP',
            zipcode: '04551010',
            fee: 1599,
            }

            const checkout = createCheckout({
            key,
            transaction,
            customer,
            billing,
            shipping,
            })

            checkout
                .open()
        `
        describe('Boleto', () => {
          it("will close checkout using footer's button", () => {
            openCustomWithParams(api)

            cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:last').click()

            cy.get('[type="submit"]:last').click()
            cy.get('[type="submit"]:last').click()

            cy.wait(400)

            cy.get('.success__footer > button:last').click()

            cy.get('.paymentoptionsPage__optionsContainer').should('not.exist')
          })
          it("will close checkout using header's button", () => {
            openCustomWithParams(api)

            cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:last').click()

            cy.get('[type="submit"]:last').click()
            cy.get('[type="submit"]:last').click()

            cy.wait(400)

            cy.get('.checkout__closeButton').click()

            cy.get('.paymentoptionsPage__optionsContainer').should('not.exist')
          })
        })
        describe('Credit Card', () => {
          it("will close checkout using footer's button", () => {
            openCustomWithParams(api)

            cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:first').click()

            cy.get('[type="submit"]:last').click()

            cy.get('[name="cardNumber"]').type('4556599125465782')
            cy.get('[name="holderName"]').type('joao da silva')
            cy.get('[name="expiration"]').type('0822')
            cy.get('[name="cvv"]').type('545')
            cy.get('[type="submit"]:last').click()

            cy.wait(400)

            cy.get('.success__footer > button:last').click()

            cy.get('.paymentoptionsPage__optionsContainer').should('not.exist')
          })

          it.only("will close checkout using header's button", () => {
            openCustomWithParams(api)

            cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:first').click()

            cy.get('[type="submit"]:last').click()

            cy.get('[name="cardNumber"]').type('4556599125465782')
            cy.get('[name="holderName"]').type('joao da silva')
            cy.get('[name="expiration"]').type('0822')
            cy.get('[name="cvv"]').type('545')
            cy.get('[type="submit"]:last').click()

            cy.wait(400)

            cy.get('.checkout__closeButton').click()

            cy.get('.paymentoptionsPage__optionsContainer').should('not.exist')
          })
        })
      })
    })
  })
})
