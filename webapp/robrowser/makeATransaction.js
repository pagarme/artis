module.exports = (browser, next) => {
  browser
    .maximize()
    .waitForElementByName('q', 5000)
    .elementByName('q')
    .sendKeys('BrowserStack')
    .elementByClassName('lsb')
    .click()
    .saveScreenshot('google_search.png')
    .fin(next)
    .done()
}
