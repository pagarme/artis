import { openCustomWithParams } from '../../../helpers/custom'

describe('Pagarme', () => {
  describe('Custom', () => {
    describe('Flow', () => {
      describe('Steps', () => {
        it('will show Identificação, Endereços, Forma De Pagamento and Confirmação steps', () => {
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
          cy.wait(700)

          cy.get('.progressBar__step').should('exist')
          cy.get('.progressBar__step').then((elem) => {
            expect(elem.length).to.equal(4)
            expect(elem[0].innerText).to.equal('Identificação\n')
            expect(elem[1].innerText).to.equal('Endereços\n')
            expect(elem[2].innerText).to.equal('Forma De Pagamento\n')
            expect(elem[3].innerText).to.equal('Confirmação\n')
          })
        })
        it('will show Endereços, Forma De Pagamento and Confirmação steps without billing and shipping', () => {
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

          const checkout = createCheckout({
            key,
            transaction,
            customer,
          })

          checkout
            .open()
        `

          openCustomWithParams(api)
          cy.wait(700)

          cy.get('.progressBar__step').should('exist')
          cy.get('.progressBar__step').then((elem) => {
            expect(elem.length).to.equal(3)
            expect(elem[0].innerText).to.equal('Endereços\n')
            expect(elem[1].innerText).to.equal('Forma De Pagamento\n')
            expect(elem[2].innerText).to.equal('Confirmação\n')
          })
        })
        it('will show Endereços, Forma De Pagamento and Confirmação steps without shipping', () => {
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

          const checkout = createCheckout({
            key,
            transaction,
            customer,
            billing,
          })

          checkout
            .open()
        `

          openCustomWithParams(api)
          cy.wait(700)

          cy.get('.progressBar__step').should('exist')
          cy.get('.progressBar__step').then((elem) => {
            expect(elem.length).to.equal(3)
            expect(elem[0].innerText).to.equal('Endereços\n')
            expect(elem[1].innerText).to.equal('Forma De Pagamento\n')
            expect(elem[2].innerText).to.equal('Confirmação\n')
          })
        })
        it('will show Forma De Pagamento and Confirmação steps', () => {
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

          openCustomWithParams(api)
          cy.wait(700)

          cy.get('.progressBar__step').should('exist')
          cy.get('.progressBar__step').then((elem) => {
            expect(elem.length).to.equal(2)
            expect(elem[0].innerText).to.equal('Forma De Pagamento\n')
            expect(elem[1].innerText).to.equal('Confirmação\n')
          })
        })
      })
    })
  })
})
