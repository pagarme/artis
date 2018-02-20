const findByTextRegex = text => `//*[contains(text(), '${text}')]`

module.exports = (browser, next, catchError) => {
  browser
    .waitForElementByXPath(findByTextRegex('Simple'), 10000)
    .click()
    .waitForElementByXPath(findByTextRegex('Pagar'), 10000)
    .click()
    .saveScreenshot('1_personaldata.png')
    .waitForElementByXPath(findByTextRegex('Continuar'), 10000)
    .click()
    .saveScreenshot('2_billingaddress.png')
    .waitForElementByXPath(findByTextRegex('Continuar'), 10000)
    .click()
    .saveScreenshot('3_paymentdata.png')
    .fail(catchError)
    .fin(next)
    .done()
}
