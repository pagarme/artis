function openCustomWithParams (api) {
  cy.visit('/')

  cy.get('#btn-open-textarea').click()
  cy.get('#textarea-code').type(api)
  cy.get('#btn-open-checkout').click()
  cy.wait(300)
}

function fillCustomerPage () {
  cy.get('input[name="name"]').type('Morpheus')
  cy.get('input[name="email"]').type('morpheus@nabucodonosor.com')
  cy.get('input[name="documentNumber"]').type('405.729.160-19')
  cy.get('input[name="phoneNumber"]').type('00000000000')
}

function fillAddressPage (zipcode = '03675030', number = '123') {
  cy.get('input[name="zipcode"]').type('03675030')
  cy.wait(1000)
  cy.get('input[name="number"]').type(number)
}

export {
  fillAddressPage,
  fillCustomerPage,
  openCustomWithParams,
}
