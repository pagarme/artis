describe('Pagarme', () => {
  describe('Simple', () => {
    it('should make a boleto transaction', () => {
      cy.visit('/')

      //Open checkout
      cy.get('#btn-open-simple').click()
      cy.get('.checkout-button').click()

      //Fill customer inputs
      cy.get('[name="name"]').type('João S. R. Silva')
      cy.get('[name="email"]').type('joao.silva@gmail.com')
      cy.get('[name="documentNumber"]').type('749.679.050-80')
      cy.get('[name="phoneNumber"]').type('11985963625')
      cy.get('[type="submit"]').click()

      //Fill billing inputs
      cy.get('[name="zipcode"]').type('03675030')
      cy.wait(520)
      cy.get('[name="number"]').type('123')
      cy.get('[type="submit"]').click()

      //Choose boleto option
      cy.get('.paymentoptionsPage__optionsContainer > .darkButton__wrapper:last').click()
      cy.get('[type="submit"]:last').click()

      //Choose pay boleto
      cy.get('[type="submit"]:last').click()

      //Success page
      cy.get('h1')
        .contains('Deu tudo certo!')
    })
  })
})
