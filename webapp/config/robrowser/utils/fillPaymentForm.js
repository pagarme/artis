module.exports = function fillPaymentForm (order, type) {
  if (type === 'boleto') {
    return this
      .saveScreenshot(`${order}_payment_page.png`)
      .buttonClick('boleto')
      .saveScreenshot(`${order}_payment_page__boleto.png`)
  }

  return this
}
