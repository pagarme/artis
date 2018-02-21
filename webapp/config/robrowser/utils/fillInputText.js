module.exports = function fillInputText (inputName, value) {
  return this
    .elementByName(inputName)
    .sendKeys(value)
}
