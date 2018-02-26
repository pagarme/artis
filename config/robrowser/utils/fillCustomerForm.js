module.exports = function fillCustomerForm (order) {
  return this
    .saveScreenshot(`${order}_customer_page__form-empty.png`)
    .fillInputText('name', 'Dan Abramov')
    .fillInputText('email', 'danabramov@gmail.com')
    .fillInputText('documentNumber', '42024379850')
    .fillInputText('phoneNumber', '11904030490')
    .saveScreenshot(`${order}_customer_page__form-filled.png`)
}
