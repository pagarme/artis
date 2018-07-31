describe('Pagarme', () => {
  describe('Simple', () => {
    describe('Shipping', () => {
      it('should validate zipcode', () => {
        cy.visit('/')

        // Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('#checkout-button').click()

        // Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]:last').click()

        // Fill billing inputs
        cy.get('[name="zipcode"]').type('03675030')
        cy.wait(800)
        cy.get('[name="number"]').type('1234')
        cy.get('input[type="checkbox"]').click()
        cy.get('[type="submit"]:last').click()

        // Required
        cy.get('[name="zipcode"]').type('1')
        cy.get('[name="zipcode"]').type('{selectall}{backspace}')

        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Min length
        cy.get('[name="zipcode"]').type('{selectall}{backspace}')
        cy.get('[name="zipcode"]').type('1')
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Esse campo precisa de 8 caracteres')
          })

        // CEP Valid
        cy.get('[name="zipcode"]').type('03675030')
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should('not.exist')
      })
      it('should validate street', () => {
        cy.visit('/')

        // Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('#checkout-button').click()

        // Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]:last').click()

        // Fill billing inputs
        cy.get('[name="zipcode"]').type('03675030')
        cy.wait(800)
        cy.get('[name="number"]').type('1234')
        cy.get('input[type="checkbox"]').click()
        cy.get('[type="submit"]:last').click()

        // Required
        cy.get('[name="street"]').type('1')
        cy.get('[name="street"]').type('{selectall}{backspace}')

        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Max length
        cy.get('[name="street"]').clear()
        cy.get('[name="street"]').type('01234567890123456789012345678901234567890')
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Você excedeu o limite de 40 caracteres')
          })

        // Street valid
        cy.get('[name="street"]').type('{selectall}{backspace}')
        cy.get('[name="street"]').type('rua das dores')
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should('not.exist')
      })

      it('should validate street number', () => {
        cy.visit('/')

        // Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('#checkout-button').click()

        // Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]:last').click()

        // Fill billing inputs
        cy.get('[name="zipcode"]').type('03675030')
        cy.wait(800)
        cy.get('[name="number"]').type('1234')
        cy.get('input[type="checkbox"]').click()
        cy.get('[type="submit"]:last').click()

        // Required
        cy.get('[name="number"]').type('1')
        cy.get('[name="number"]').type('{selectall}{backspace}')

        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Max length
        cy.get('[name="number"]').clear()
        cy.get('[name="number"]').type('123456')
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Você excedeu o limite de 5 caracteres')
          })

        // Number valid
        cy.get('[name="number"]').type('{selectall}{backspace}')
        cy.get('[name="number"]').type('1')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(3) p')
          .should('not.exist')
      })

      it('should validate street complement', () => {
        cy.visit('/')

        // Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('#checkout-button').click()

        // Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]:last').click()

        // Fill billing inputs
        cy.get('[name="zipcode"]').type('03675030')
        cy.wait(800)
        cy.get('[name="number"]').type('1234')
        cy.get('input[type="checkbox"]').click()
        cy.get('[type="submit"]:last').click()

        // Max length
        cy.get('[name="complement"]').clear()
        cy.get('[name="complement"]').type(`12345678912345678912345678912345678
        9123456789123456789123456789123`)
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Você excedeu o limite de 65 caracteres')
          })

        // Complement valid
        cy.get('[name="complement"]').type('{selectall}{backspace}')
        cy.get('[name="complement"]').type('ape 303')
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should('not.exist')
      })

      it('should validate city', () => {
        cy.visit('/')

        // Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('#checkout-button').click()

        // Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]:last').click()

        // Fill billing inputs
        cy.get('[name="zipcode"]').type('03675030')
        cy.wait(800)
        cy.get('[name="number"]').type('1234')
        cy.get('input[type="checkbox"]').click()
        cy.get('[type="submit"]:last').click()

        // Required
        cy.get('[name="city"]').type('a')
        cy.get('[name="city"]').type('{selectall}{backspace}')

        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Min length
        cy.get('[name="city"]').clear()
        cy.get('[name="city"]').type('0')
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Esse campo precisa de 4 caracteres')
          })

        // Max length
        cy.get('[name="city"]').clear()
        cy.get('[name="city"]').type('012345678901234567890123456')
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Você excedeu o limite de 25 caracteres')
          })

        // City valid
        cy.get('[name="city"]').type('{selectall}{backspace}')
        cy.get('[name="city"]').type('são paulo')
        cy
          .get('.customerPage__inputsContainer > div:nth-child(4) p:last')
          .should('not.exist')
      })

      it('should validate state', () => {
        cy.visit('/')

        // Open checkout
        cy.get('#btn-open-simple').click()
        cy.get('#checkout-button').click()

        // Fill customer inputs
        cy.get('[name="name"]').type('João S. R. Silva')
        cy.get('[name="email"]').type('joao.silva@gmail.com')
        cy.get('[name="documentNumber"]').type('749.679.050-80')
        cy.get('[name="phoneNumber"]').type('11985963625')
        cy.get('[type="submit"]:last').click()

        // Fill billing inputs
        cy.get('[name="zipcode"]').type('03675030')
        cy.wait(800)
        cy.get('[name="number"]').type('1234')
        cy.get('input[type="checkbox"]').click()
        cy.get('[type="submit"]:last').click()

        // Required
        cy.get('[name="state"]').type('a')
        cy.get('[name="state"]').type('{selectall}{backspace}')

        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Este campo é obrigatório')
          })

        // Min length
        cy.get('[name="state"]').clear()
        cy.get('[name="state"]').type('s')
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Esse campo precisa de 2 caracteres')
          })

        // Max length
        cy.get('[name="state"]').clear()
        cy.get('[name="state"]').type('sao paulo')
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should(($el) => {
            expect($el).to.have.text('Você excedeu o limite de 2 caracteres')
          })

        // State valid
        cy.get('[name="state"]').type('{selectall}{backspace}')
        cy.get('[name="state"]').type('sp')
        cy
          .get('.addressesPage__content .input__secondaryText')
          .should('not.exist')
      })
    })
  })
})
