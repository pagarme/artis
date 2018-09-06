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
        describe('with antifraude enable', () => {
          it('and tangible itens and billing on payload', () => {
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

            const cart = {
              items: [
                {
                  id: 1,
                  title: 'Red pill',
                  unitPrice: 5000,
                  quantity: 1,
                  tangible: true,
                },
                {
                  id: 2,
                  title: 'Blue pill',
                  unitPrice: 5000,
                  quantity: 1,
                  tangible: true,
                },
              ],
            }

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              customer,
              billing,
              key,
              transaction,
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

            cy.get('.addressesPage__switchLabel').should('exist')
            cy.get('.addressesPage__switchLabel').then((elem) => {
              expect(elem[0].innerHTML).to.eq('Entregar no mesmo endereço?')
            })
          })

          it('and without tangible itens and billing on payload', () => {
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

            const cart = {
              items: [
                {
                  id: 1,
                  title: 'Red pill',
                  unitPrice: 5000,
                  quantity: 1,
                  tangible: false,
                },
                {
                  id: 2,
                  title: 'Blue pill',
                  unitPrice: 5000,
                  quantity: 1,
                  tangible: false,
                },
              ],
            }

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              customer,
              billing,
              key,
              transaction,
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

            cy.get('.addressesPage__switchLabel').should('not.exist')
          })
        })
        describe('with antifraude disabled', () => {
          it('and without tangible itens and billing on payload', () => {
            const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const configs = {
              antifraude: false,
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

            const cart = {
              items: [
                {
                  id: 1,
                  title: 'Red pill',
                  unitPrice: 5000,
                  quantity: 1,
                  tangible: false,
                },
                {
                  id: 2,
                  title: 'Blue pill',
                  unitPrice: 5000,
                  quantity: 1,
                  tangible: false,
                },
              ],
            }

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              customer,
              configs,
              billing,
              key,
              transaction,
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

            cy.get('.paymentoptionsPage__title').should('exist')
            cy.get('.paymentoptionsPage__title').then((elem) => {
              expect(elem[0].innerHTML).to.eq('Como quer pagar?')
            })
          })

          it('and with tangible itens and billing on payload', () => {
            const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const configs = {
              antifraude: false,
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

            const cart = {
              items: [
                {
                  id: 1,
                  title: 'Red pill',
                  unitPrice: 5000,
                  quantity: 1,
                  tangible: true,
                },
                {
                  id: 2,
                  title: 'Blue pill',
                  unitPrice: 5000,
                  quantity: 1,
                  tangible: true,
                },
              ],
            }

            const transaction = {
              amount: 10000,
            }

            const checkout = createCheckout({
              customer,
              billing,
              key,
              transaction,
              cart,
              configs,
            })

            checkout
              .open()
            `

            cy.visit('/')

            cy.get('#btn-open-textarea').click()
            cy.get('#textarea-code').type(api)
            cy.get('#btn-open-checkout').click()
            cy.wait(300)

            cy.get('.addressesPage__switchLabel').should('not.exist')
          })
        })
      })
    })
  })
})
