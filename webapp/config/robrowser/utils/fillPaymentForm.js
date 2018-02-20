module.exports = function fillPaymentForm (order, type) {
  if (type === 'boleto') {
    return this
      .saveScreenshot(`${order}_payment_page.png`)
      .buttonClick('boleto')
      .saveScreenshot(`${order}_payment_page__boleto.png`)
  }

  if (type === 'creditcard') {
    return this
      .buttonClick('creditcard')
      .saveScreenshot(`${order}_payment_page.png`)
      .saveScreenshot(`${order}_payment_page__creditcard-empty.png`)
      .fillInputText('cardNumber', '4111111111111111')
      .fillInputText('holderName', 'Thomas A. Anderson')
      .fillInputText('expiration', '1219')
      .fillInputText('cvv', '123')
      .saveScreenshot(`${order}_payment_page__creditcard-filled.png`)
  }

  return this
}
