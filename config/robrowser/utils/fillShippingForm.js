module.exports = function fillShippingForm (order) {
  return this
    .saveScreenshot(`${order}_shipping_page.png`)
    .buttonClick('shipping-page-add-address-btn')
    .saveScreenshot(`${order}_shipping_page__add-new-address-empty.png`)
    .fillInputText('name', 'Trabalho')
    .fillInputText('zipcode', '05171000')
    .fillInputText('number', '681')
    .saveScreenshot(`${order}_shipping_page__add-new-address-filled.png`)
    .buttonClick('address-form-confirm-btn')    
}
