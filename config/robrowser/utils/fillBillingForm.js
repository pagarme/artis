module.exports = function fillBillingForm (order) {
  return this
    .saveScreenshot(`${order}_billing_page__form-empty.png`)
    .fillInputText('zipcode', '05171000')
    .fillInputText('street', 'Rua Gomes de Carvalho')
    .fillInputText('number', '681')
    .fillInputText('complement', 'Em frente do semáforo')
    .saveScreenshot(`${order}_billing_page__form-filled.png`)
}
