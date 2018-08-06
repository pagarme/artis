describe('Custom', () => {
  describe('API', () => {
    describe('Shipping', () => {
      describe('Should open', () => {
        it('with customer, billing and shipping', () => {
          const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

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

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              customer,
              billing,
              shipping,
              key,
              transaction,
            })

            checkout
              .open()
            `

          cy.visit('/')

          cy.get('#btn-open-textarea').click()
          cy.get('#textarea-code').type(api)
          cy.get('#btn-open-checkout').click()
          cy.wait(300)

          cy.get('.customerPage__title').should('not.exist')
          cy.get('.addressesPage__title').should('not.exist')
          cy.get('.paymentoptionsPage__title').then((elem) => {
            expect(elem[0].innerHTML).to.eq('Como quer pagar?')
          })

          cy.get('.actionButton__wrapper > button').should('exist')
          cy.get('.actionButton__wrapper > button').then((elem) => {
            expect(elem.length).to.eq(2)
            expect(elem[0].innerText).contains('CARTÃO DE CRÉDITO')
            expect(elem[1].innerText).contains('BOLETO')
          })
        })
      })
    })
  })
})
