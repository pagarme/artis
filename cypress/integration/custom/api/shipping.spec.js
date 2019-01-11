import { cyGet } from '../../../helpers/custom'

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

          cyGet('#btn-open-textarea').click()
          cyGet('#textarea-code').type(api)
          cyGet('#btn-open-checkout').click()

          cyGet('.customerPage__title').should('not.exist')
          cyGet('.addressesPage__title').should('not.exist')
          cyGet('.paymentoptionsPage__title').should('have.html', 'Como quer pagar?')

          cyGet('.actionButton__wrapper > button').should('exist')
          cyGet('.actionButton__wrapper > button').then((elem) => {
            expect(elem.length).to.eq(2)
            expect(elem[0].innerText).contains('CARTÃO DE CRÉDITO')
            expect(elem[1].innerText).contains('BOLETO')
          })
        })
      })
      it('should show page without shipping data', () => {
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

        cyGet('#btn-open-textarea').click()
        cyGet('#textarea-code').type(api)
        cyGet('#btn-open-checkout').click()

        cyGet('.switch__switch').click()

        cyGet('[type="submit"]:last').click()

        cyGet('.addressesPage__title').should('have.html', 'Onde devemos fazer a entrega?')
      })
      describe('With antifraud enabled', () => {
        describe('and tangible itens and billing on payload', () => {
          it('should go to shipping page', () => {
            const api = `
              const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

              const configs = {
                antifraud: true,
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
                configs,
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

            cyGet('#btn-open-textarea').click()
            cyGet('#textarea-code').type(api)
            cyGet('#btn-open-checkout').click()

            cyGet('.addressesPage__switchLabel').should('exist')
            cyGet('.addressesPage__switchLabel').should('have.html', 'Entregar no mesmo endereço?')
          })
        })

        describe('and without tangible itens and billing on payload', () => {
          it('should go to shipping page', () => {
            const api = `
              const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

              const configs = {
                antifraud: true,
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
                ],
              }

              const transaction = {
                amount: 10000,
              }

              const checkout = createCheckout({
                configs,
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

            cyGet('#btn-open-textarea').click()
            cyGet('#textarea-code').type(api)
            cyGet('#btn-open-checkout').click()

            cyGet('.addressesPage__switchLabel').should('have.html', 'Entregar no mesmo endereço?')
          })
        })
      })
      describe('With antifraud disabled', () => {
        it('and without tangible itens and billing on payload', () => {
          const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const configs = {
              antifraud: false,
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

          cyGet('#btn-open-textarea').click()
          cyGet('#textarea-code').type(api)
          cyGet('#btn-open-checkout').click()

          cyGet('.paymentoptionsPage__title').should('exist')
          cyGet('.paymentoptionsPage__title').should('have.html', 'Como quer pagar?')
        })

        it('and with tangible itens and billing on payload', () => {
          const api = `
            const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

            const configs = {
              antifraud: false,
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

          cyGet('#btn-open-textarea').click()
          cyGet('#textarea-code').type(api)
          cyGet('#btn-open-checkout').click()

          cyGet('.addressesPage__switchLabel').should('exist')
        })
      })
      describe('Shipping switch button', () => {
        describe('with antifraud', () => {
          it('should be visible with tangible itens', () => {
            const api = `
              const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

              const configs = {
                antifraud: true
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
                ]
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

              const transaction = {
                amount: 10000,
              }

              const checkout = createCheckout({
                configs,
                customer,
                billing,
                key,
                transaction,
              })

              checkout
                .open()
            `

            cy.visit('/')

            cyGet('#btn-open-textarea').click()
            cyGet('#textarea-code').type(api)
            cyGet('#btn-open-checkout').click()

            cyGet('.switch__switch').click()

            cyGet('[type="submit"]:last').click()

            cyGet('.addressesPage__title').should('have.html', 'Onde devemos fazer a entrega?')
          })
          it('should be visible with intangible itens', () => {
            const api = `
              const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

              const configs = {
                antifraud: true
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
                ]
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

              const transaction = {
                amount: 10000,
              }

              const checkout = createCheckout({
                configs,
                customer,
                billing,
                key,
                transaction,
              })

              checkout
                .open()
            `

            cy.visit('/')

            cyGet('#btn-open-textarea').click()
            cyGet('#textarea-code').type(api)
            cyGet('#btn-open-checkout').click()

            cyGet('.switch__switch').click()

            cyGet('[type="submit"]:last').click()

            cyGet('.addressesPage__title').should('have.html', 'Onde devemos fazer a entrega?')
          })
        })
        describe('without antifraud', () => {
          it('should be visible with tangible itens', () => {
            const api = `
              const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

              const configs = {
                antifraud: false
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
                ]
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

              const transaction = {
                amount: 10000,
              }

              const checkout = createCheckout({
                configs,
                customer,
                billing,
                cart,
                key,
                transaction,
              })

              checkout
                .open()
            `

            cy.visit('/')

            cyGet('#btn-open-textarea').click()
            cyGet('#textarea-code').type(api)
            cyGet('#btn-open-checkout').click()

            cyGet('.switch__switch').should('exist')

            cyGet('[type="submit"]:last').click()

            cyGet('.paymentoptionsPage__title').should('have.html', 'Como quer pagar?')
          })
          it('should be invisible with intangible itens', () => {
            const api = `
              const key = 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz';

              const configs = {
                antifraud: false,
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
                ]
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

              const transaction = {
                amount: 10000,
              }

              const checkout = createCheckout({
                configs,
                customer,
                cart,
                billing,
                key,
                transaction,
              })

              checkout
                .open()
            `

            cy.visit('/')

            cyGet('#btn-open-textarea').click()
            cyGet('#textarea-code').type(api)
            cyGet('#btn-open-checkout').click()

            cyGet('.switch__switch').should('not.exist')
            cyGet('.paymentoptionsPage__title').should('have.html', 'Como quer pagar?')
          })
        })
      })
    })
  })
})
