describe('Pagarme', () => {
  describe('Simple', () => {
    describe('Credit Card', () => {
      it('should validate card number', () => {
        cy.visit('/')

        //Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('#checkout-button').click()

        //Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]:last').click()

        //Fill billing inputs
        cy.get('[name="zipcode"]').type('03675030')
        cy.wait(800)
        cy.get('[name="number"]').type('123')
        cy.get('[type="submit"]:last').click()

        //Choose card option
        cy.get('.paymentoptionsPage__optionsContainer .button__button:first').click()
        cy.get('[type="submit"]:last').click()

        // Required
        cy.get('[name="cardNumber"]').type('1')
        cy.get('[name="cardNumber"]').type('{selectall}{backspace}')

        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Min length
        cy.get('[name="cardNumber"]').type('{selectall}{backspace}')
        cy.get('[name="cardNumber"]').type('1')
        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Esse campo precisa de 16 caracteres')
          })

        // Number valid
        cy.get('[name="cardNumber"]').type('{selectall}{backspace}')
        cy.get('[name="cardNumber"]').type('4556599125465782')
        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should('not.exist')
      })

      it('should validate card holder', () => {
        cy.visit('/')

        //Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('#checkout-button').click()

        //Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]:last').click()

        //Fill billing inputs
        cy.get('[name="zipcode"]').type('03675030')
        cy.wait(800)
        cy.get('[name="number"]').type('123')
        cy.get('[type="submit"]:last').click()

        //Choose card option
        cy.get('.paymentoptionsPage__optionsContainer .button__button:first').click()
        cy.get('[type="submit"]:last').click()

        // Required
        cy.get('[name="holderName"]').type('a')
        cy.get('[name="holderName"]').type('{selectall}{backspace}')

        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Max length
        cy.get('[name="holderName"]').type('{selectall}{backspace}')
        cy.get('[name="holderName"]').type('123456789012345678912')
        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Você excedeu o limite de 20 caracteres')
          })

        // Number valid
        cy.get('[name="holderName"]').type('{selectall}{backspace}')
        cy.get('[name="holderName"]').type('joao da silva')
        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should('not.exist')
      })

      it('should validate expiration date', () => {
        cy.visit('/')

        //Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('#checkout-button').click()

        //Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]:last').click()

        //Fill billing inputs
        cy.get('[name="zipcode"]').type('03675030')
        cy.wait(800)
        cy.get('[name="number"]').type('123')
        cy.get('[type="submit"]:last').click()

        //Choose card option
        cy.get('.paymentoptionsPage__optionsContainer .button__button:first').click()
        cy.get('[type="submit"]:last').click()

        // Required
        cy.get('[name="expiration"]').type('1')
        cy.get('[name="expiration"]').type('{selectall}{backspace}')

        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Invalid
        cy.get('[name="expiration"]').type('{selectall}{backspace}')
        cy.get('[name="expiration"]').type('1')
        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Data inválida')
          })

        // Invalid
        cy.get('[name="expiration"]').type('{selectall}{backspace}')
        cy.get('[name="expiration"]').type('1111')
        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Data inválida')
          })

        // Expiration date valid
        cy.get('[name="expiration"]').type('{selectall}{backspace}')
        cy.get('[name="expiration"]').type('0520')
        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should('not.exist')
      })

      it('should validate security code', () => {
        cy.visit('/')

        //Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('#checkout-button').click()

        //Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]:last').click()

        //Fill billing inputs
        cy.get('[name="zipcode"]').type('03675030')
        cy.wait(800)
        cy.get('[name="number"]').type('123')
        cy.get('[type="submit"]:last').click()

        //Choose card option
        cy.get('.paymentoptionsPage__optionsContainer .button__button:first').click()
        cy.get('[type="submit"]:last').click()

        // Required
        cy.get('[name="cvv"]').type('1')
        cy.get('[name="cvv"]').type('{selectall}{backspace}')

        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Min length
        cy.get('[name="cvv"]').type('{selectall}{backspace}')
        cy.get('[name="cvv"]').type('1')
        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Esse campo precisa de 3 caracteres')
          })

        // cvv date valid
        cy.get('[name="cvv"]').type('{selectall}{backspace}')
        cy.get('[name="cvv"]').type('0520')
        cy
          .get('.creditcardPage__inputsContainer .input__secondaryText')
          .should('not.exist')
      })

      it('should make a credit card transaction', () => {
        cy.visit('/')

        //Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('#checkout-button').click()

        //Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]:last').click()

        //Fill billing inputs
        cy.get('[name="zipcode"]').type('03675030')
        cy.wait(800)
        cy.get('[name="number"]').type('123')
        cy.get('[type="submit"]:last').click()

        //Choose card option
        cy.get('.paymentoptionsPage__optionsContainer .button__button:first').click()
        cy.get('[type="submit"]:last').click()

        //Choose pay boleto
        cy.get('[name="cardNumber"]').type('4556599125465782')
        cy.get('[name="holderName"]').type('joao da silva')
        cy.get('[name="expiration"]').type('0822')
        cy.get('[name="cvv"]').type('545')
        cy.get('[type="submit"]:last').click()

        //Success page
        cy.get('h1')
          .contains('Deu tudo certo!')
      })
    })
  })
})
