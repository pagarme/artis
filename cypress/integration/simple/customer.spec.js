describe('Pagarme', () => {
  describe('Simple', () => {
    describe('Customer', () => {
      it('should validate name', () => {
        cy.visit('/')

        // Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('.checkout-button').click()

        // Required
        cy.get('[name="name"]').type(' ')
        cy.get('[name="name"]').clear()

        cy
          .get('.customerPage__inputsContainer > div:first p')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Min length
        cy.get('[name="name"]').type('joao')
        cy
          .get('.customerPage__inputsContainer > div:first p')
          .should(($el) => {
            expect($el).to.have.text('Esse campo precisa de 10 caracteres')
          })

        // Max length
        cy.get('[name="name"]').clear()
        cy.get('[name="name"]').type('0123456789012345678901234567890')
        cy
          .get('.customerPage__inputsContainer > div:first p')
          .should(($el) => {
            expect($el).to.have.text('Você excedeu o limite de 30 caracteres')
          })

        // Name valid
        cy.get('[name="name"]').type('{selectall}{backspace}')
        cy.get('[name="name"]').type('joao da silv')
        cy
          .get('.customerPage__inputsContainer > div:first p')
          .should('not.exist')
      })

      it('should validate email', () => {
        cy.visit('/')

        // Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('.checkout-button').click()

        // Required
        cy.get('[name="email"]').type(' ')
        cy.get('[name="email"]').clear()

        cy
          .get('.customerPage__inputsContainer > div:nth-child(2) p')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Valid email
        cy.get('[name="email"]').clear()
        cy.get('[name="email"]').type('joao')

        cy
          .get('.customerPage__inputsContainer > div:nth-child(2) p')
          .should(($el) => {
            expect($el).to.have.text('Deve ser um email válido')
          })

        // Min length
        cy.get('[name="email"]').clear()
        cy.get('[name="email"]').type('j@gmail.com')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(2) p')
          .should(($el) => {
            expect($el).to.have.text('Esse campo precisa de 10 caracteres')
          })

        // Max length
        cy.get('[name="email"]').clear()
        cy.get('[name="email"]').type('12345678901234567890123@gmail.com')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(2) p')
          .should(($el) => {
            expect($el).to.have.text('Você excedeu o limite de 30 caracteres')
          })

        // Email valid
        cy.get('[name="email"]').type('{selectall}{backspace}')
        cy.get('[name="email"]').type('123456@gmail.com')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(2) p')
          .should('not.exist')
      })

      it('should validate cpf', () => {
        cy.visit('/')

        // Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('.checkout-button').click()

        // Required
        cy.get('[name="documentNumber"]').type('1')
        cy.get('[name="documentNumber"]').type('{selectall}{backspace}')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(3) p')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Min length
        cy.get('[name="documentNumber"]').type('{selectall}{backspace}')
        cy.get('[name="documentNumber"]').type('1')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(3) p')
          .should(($el) => {
            expect($el).to.have.text('Esse campo precisa de 11 caracteres')
          })

        // CPF invalid
        cy.get('[name="documentNumber"]').type('{selectall}{backspace}')
        cy.get('[name="documentNumber"]').type('11111111111')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(3) p')
          .should(($el) => {
            expect($el).to.have.text('CPF inválido')
          })

        // CPF valid
        cy.get('[name="documentNumber"]').type('{selectall}{backspace}')
        cy.get('[name="documentNumber"]').type('80374791023')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(3) p')
          .should('not.exist')
      })

      it('should validate telephone', () => {
        cy.visit('/')

        // Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('.checkout-button').click()

        // Required
        cy.get('[name="phoneNumber"]').type('1')
        cy.get('[name="phoneNumber"]').type('{selectall}{backspace}')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(4) p')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Min length
        cy.get('[name="phoneNumber"]').type('1')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(4) p')
          .should(($el) => {
            expect($el).to.have.text('Esse campo precisa de 10 caracteres')
          })

        // Phone valid
        cy.get('[name="phoneNumber"]').type('{selectall}{backspace}')
        cy.get('[name="phoneNumber"]').type('11985963652')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(4) p')
          .should('not.exist')
      })
    })
  })
})
