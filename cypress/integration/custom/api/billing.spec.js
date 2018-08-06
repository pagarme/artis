describe('Custom', () => {
  describe('API', () => {
    describe('Billing', () => {
      describe('Should open', () => {
        it('with customer and billing', () => {
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

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              customer,
              billing,
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
          cy.get('.addressesPage__title').then((elem) => {
            expect(elem[0].innerHTML).to.eq('Qual é seu endereço de cobrança?')
          })
          cy.get('input[name="zipcode"]').should('have.value', '04551-010')
          cy.get('input[name="street"]').should('have.value', 'Rua Fidêncio Ramos')
          cy.get('input[name="number"]').should('have.value', '308')
          cy.get('input[name="city"]').should('have.value', 'São Paulo')
          cy.get('input[name="state"]').should('have.value', 'SP')

          cy.get('.switch__switch').click()
          cy.get('[type="submit"]:last').click()

          cy.get('.addressesPage__title').then((elem) => {
            expect(elem[0].innerHTML).to.eq('Onde devemos fazer a entrega?')
          })
        })
      })
    })
  })
})

