describe('Pagarme', () => {
  describe('Simple', () => {
    describe('Billing', () => {
      it('should validate cep', () => {
        cy.visit('/')

        // Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('.checkout-button').click()

        // Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]').click()

        // Required
        cy.get('[name="zipcode"]').type('1')
        cy.get('[name="zipcode"]').type('{selectall}{backspace}')

        cy
          .get('.addressesPage__inputsContainer > div:first p')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Min length
        cy.get('[name="zipcode"]').type('{selectall}{backspace}')
        cy.get('[name="zipcode"]').type('1')
        cy
          .get('.addressesPage__inputsContainer > div:first p')
          .should(($el) => {
            expect($el).to.have.text('Esse campo precisa de 8 caracteres')
          })

        // CEP Valid
        cy.get('[name="zipcode"]').type('03675030')
        cy
          .get('.addressesPage__inputsContainer > div:first p')
          .should('not.exist')
      })
    })
  })
})
