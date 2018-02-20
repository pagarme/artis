const findByTextRegex = text => `//*[contains(text(), '${text}')]`

module.exports = (browser, next, catchError) => {
  browser
    .maximize()
    .waitForElementByXPath(findByTextRegex('Simple'), 10000)
    .click()
    .waitForElementByXPath(findByTextRegex('Pagar'), 10000)
    .click()
    .saveScreenshot('1_identification.png')
    .waitForElementByXPath(findByTextRegex('Continuar'), 10000)
    .click()
    .saveScreenshot('2_payment.png')
    .fail(catchError)
    .fin(next)
    .done()
}
