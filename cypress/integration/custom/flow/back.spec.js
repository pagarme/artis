import {
  fillAddressPage,
  fillCustomerPage,
  openCustomWithParams,
} from '../../../helpers/custom'

describe('Pagarme', () => {
  describe('Custom', () => {
    describe('Flow', () => {
      describe('Back', () => {
        describe('When Customer, Billing and Shipping does not exist', () => {
          it('will return from billing to customer', () => {
            const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              key,
              transaction,
            })

            checkout
              .open()
            `
            openCustomWithParams(api)
            fillCustomerPage()

            cy.get('[type="submit"]:last').click()
            cy.get('.navigation-bar__buttonContainer > button:first').click()

            cy.get('.customerPage__title').should('exist')
          })
          it('will return from shipping to billing', () => {
            const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              key,
              transaction,
            })

            checkout
              .open()
            `
            openCustomWithParams(api)
            fillCustomerPage()

            cy.get('[type="submit"]:last').click()

            fillAddressPage()

            cy.get('.switch__switch').click()
            cy.get('[type="submit"]:last').click()
            cy.get('.navigation-bar__buttonContainer > button:first').click()

            cy.get('.addressesPage__title').should('exist')
            cy.get('.addressesPage__title').then((elem) => {
              expect(elem[0].innerText).to.eq('Qual é seu endereço de cobrança?')
            })
          })
          it('will return from payment to shipping', () => {
            const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              key,
              transaction,
            })

            checkout
              .open()
            `
            openCustomWithParams(api)
            fillCustomerPage()

            cy.get('[type="submit"]:last').click()

            fillAddressPage()

            cy.get('.switch__switch').click()
            cy.get('[type="submit"]:last').click()

            fillAddressPage('03677030', '456')

            cy.get('[type="submit"]:last').click()

            cy.get('.navigation-bar__buttonContainer > button:first').click()

            cy.get('.addressesPage__title').should('exist')
            cy.get('.addressesPage__title').then((elem) => {
              expect(elem[0].innerText).to.eq('Onde devemos fazer a entrega?')
            })
          })
          it('will return from payment to billing', () => {
            const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              key,
              transaction,
            })

            checkout
              .open()
            `
            openCustomWithParams(api)
            fillCustomerPage()

            cy.get('[type="submit"]:last').click()

            fillAddressPage()

            cy.get('[type="submit"]:last').click()
            cy.get('.navigation-bar__buttonContainer > button:first').click()

            cy.get('.addressesPage__title').should('exist')
            cy.get('.addressesPage__title').then((elem) => {
              expect(elem[0].innerText).to.eq('Qual é seu endereço de cobrança?')
            })
          })
          it('will return from boleto to payment', () => {
            const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              key,
              transaction,
            })

            checkout
              .open()
            `
            openCustomWithParams(api)
            fillCustomerPage()

            cy.get('[type="submit"]:last').click()

            fillAddressPage()

            cy.get('[type="submit"]:last').click()

            cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:last').click()

            cy.get('[type="submit"]:last').click()
            cy.get('.navigation-bar__buttonContainer > button:first').click()

            cy.get('.paymentoptionsPage__title').should('exist')
            cy.get('.paymentoptionsPage__title').then((elem) => {
              expect(elem[0].innerText).to.eq('Como quer pagar?')
            })
          })
          it('will return from credit card to payment', () => {
            const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              key,
              transaction,
            })

            checkout
              .open()
            `
            openCustomWithParams(api)
            fillCustomerPage()

            cy.get('[type="submit"]:last').click()

            fillAddressPage()

            cy.get('[type="submit"]:last').click()

            cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:first').click()

            cy.get('[type="submit"]:last').click()
            cy.get('.navigation-bar__buttonContainer > button:first').click()

            cy.get('.paymentoptionsPage__title').should('exist')
            cy.get('.paymentoptionsPage__title').then((elem) => {
              expect(elem[0].innerText).to.eq('Como quer pagar?')
            })
          })
        })
      })
    })
  })
})
