module.exports = (browser, next) => {
  browser
    .waitForElementByName('q', 10000)
    .elementByName('q')
    .sendKeys('BrowserStack')
    .waitForElementByName('btnG', 10000)
    .elementByName('btnG')
    .click()
    .saveScreenshot('google_search.png')
    .fin(next)
    .done()
}
