const { forEachObjIndexed } = require('ramda')

const fillCustomerForm = require('./fillCustomerForm')
const fillShippingForm = require('./fillShippingForm')
const fillPaymentForm = require('./fillPaymentForm')
const fillInputText = require('./fillInputText')
const buttonClick = require('./buttonClick')

const methods = {
  fillCustomerForm,
  fillShippingForm,
  fillPaymentForm,
  fillInputText,
  buttonClick,
}

module.exports = wd =>
  forEachObjIndexed(
    (value, key) => wd.addPromiseChainMethod(key, value),
    methods
  )
