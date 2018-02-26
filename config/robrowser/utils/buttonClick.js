module.exports = function buttonClick (value) {
  return this
    .elementById(value)
    .click()
}
