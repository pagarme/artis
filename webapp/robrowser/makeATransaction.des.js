module.exports = (browser, next) => {
  browser
    .maximize()
    .waitForElementByName('q', 10000)
    .elementByName('q')
    .sendKeys('BrowserStack')
    .waitForElementByClassName('lsb', 10000)
    .elementByClassName('lsb')
    .click()
    .saveScreenshot('google_search.png')
    .fin(next)
    .done()
}
