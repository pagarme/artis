describe('Custom', () => {
  describe('API', () => {
    describe('Cart', () => {
      describe('Should open', () => {
        it('with amount calc using cart items', () => {
          const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const configs = {
              enableCart: true
            }

            const cart = {
              items: [
                {
                  id: 1,
                  title: 'Red pill',
                  unitPrice: 5000,
                  quantity: 2,
                  tangible: true,
                },
                {
                  id: 2,
                  title: 'Blue pill',
                  unitPrice: 5000,
                  quantity: 1,
                  tangible: true
                }
              ]
            }

            const checkout = createCheckout({
              key,
              configs,
              cart,
            })

            checkout
              .open()
            `

          cy.visit('/')

          cy.get('#btn-open-textarea').click()
          cy.get('#textarea-code').type(api)
          cy.get('#btn-open-checkout').click()
          cy.wait(300)

          cy.get('.cart__amountResume > .cart__labels').should('exist')
          cy.get('.cart__amountResume > .cart__values').should('exist')

          cy.get('.cart__amountResume > .cart__labels').then((elem) => {
            expect(elem[0].innerText).contains('TOTAL')
          })
          cy.get('.cart__amountResume > .cart__values').then((elem) => {
            expect(elem[0].innerText).contains('150')
          })
        })
      })
    })
  })
})
