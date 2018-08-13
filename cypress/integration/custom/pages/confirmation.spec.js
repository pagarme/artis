import { openCustomWithParams } from '../../../helpers/custom'

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
      describe('Failed', () => {
        it('will return to payment page', () => {
          openCustomWithParams(api)

          cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:first').click()

          cy.get('[type="submit"]:last').click()

          cy.get('[name="cardNumber"]').type('9996599125465782')
          cy.get('[name="holderName"]').type('joao da silva')
          cy.get('[name="expiration"]').type('0822')
          cy.get('[name="cvv"]').type('545')
          cy.get('[type="submit"]:last').click()

          cy.wait(400)

          cy.get('.error__footer > button:first').click()

          cy.get('.paymentoptionsPage__title').should('exist')
          cy.get('.paymentoptionsPage__title').then((elem) => {
            expect(elem[0].innerHTML).to.eq('Como quer pagar?')
          })
        })
        it('will show error page title', () => {
          openCustomWithParams(api)

          cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:first').click()

          cy.get('[type="submit"]:last').click()

          cy.get('[name="cardNumber"]').type('9996599125465782')
          cy.get('[name="holderName"]').type('joao da silva')
          cy.get('[name="expiration"]').type('0822')
          cy.get('[name="cvv"]').type('545')
          cy.get('[type="submit"]:last').click()

          cy.wait(400)

          cy.get('.error__title').should('exist')
          cy.get('.error__title').then((elem) => {
            expect(elem[0].innerHTML).to.eq('Algo deu errado...')
          })
        })
        it('will show error page subtitle', () => {
          openCustomWithParams(api)

          cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:first').click()

          cy.get('[type="submit"]:last').click()

          cy.get('[name="cardNumber"]').type('9996599125465782')
          cy.get('[name="holderName"]').type('joao da silva')
          cy.get('[name="expiration"]').type('0822')
          cy.get('[name="cvv"]').type('545')
          cy.get('[type="submit"]:last').click()

          cy.wait(400)

          cy.get('.error__subtitle').should('exist')
          cy.get('.error__subtitle').then((elem) => {
            expect(elem[0].innerHTML).to.eq('Sua transação foi recusada')
          })
        })
        it('will show error page question', () => {
          openCustomWithParams(api)

          cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:first').click()

          cy.get('[type="submit"]:last').click()

          cy.get('[name="cardNumber"]').type('9996599125465782')
          cy.get('[name="holderName"]').type('joao da silva')
          cy.get('[name="expiration"]').type('0822')
          cy.get('[name="cvv"]').type('545')
          cy.get('[type="submit"]:last').click()

          cy.wait(400)

          cy.get('.error__questionTitle').should('exist')
          cy.get('.error__questionTitle').then((elem) => {
            expect(elem[0].innerHTML).to.eq('O que pode ter acontecido?')
          })
        })
        it('will show error page question', () => {
          openCustomWithParams(api)

          cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:first').click()

          cy.get('[type="submit"]:last').click()

          cy.get('[name="cardNumber"]').type('9996599125465782')
          cy.get('[name="holderName"]').type('joao da silva')
          cy.get('[name="expiration"]').type('0822')
          cy.get('[name="cvv"]').type('545')
          cy.get('[type="submit"]:last').click()

          cy.wait(400)

          cy.get('.error__question').should('exist')
          cy.get('.error__question').then((elem) => {
            expect(elem.length).to.equal(4)
            expect(elem[0].innerText).to.equal('O cartão possui saldo para o valor total da compra?')
            expect(elem[1].innerText).to.equal('Você digitou corretamente os dados do cartão?')
            expect(elem[2].innerText).to.equal('O cartão está dentro do prazo de validade?')
            expect(elem[3].innerText).to.equal('O cartão está desbloqueado?')
          })
        })
        it('will show error page back button', () => {
          openCustomWithParams(api)
          cy.wait(900)

          cy.get('.paymentoptionsPage__optionsContainer > .actionButton__wrapper:first').click()

          cy.get('[type="submit"]:last').click()

          cy.get('[name="cardNumber"]').type('9996599125465782')
          cy.get('[name="holderName"]').type('joao da silva')
          cy.get('[name="expiration"]').type('0822')
          cy.get('[name="cvv"]').type('545')
          cy.get('[type="submit"]:last').click()

          cy.wait(400)

          cy.get('.error__footer > .button__button').should('exist')
          cy.get('.error__footer > .button__button').then((elem) => {
            expect(elem[0].innerText).to.equal('Revisar pagamento')
          })
        })
      })
    })
  })
})
