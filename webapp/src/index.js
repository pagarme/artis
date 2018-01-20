import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'react-css-themr'
import Joi from 'joi-browser'

import Checkout from './containers/Checkout'

import createElement from './utils/createElement'
import apiValuesSchema from './utils/schemas/apiValues'

import theme from './theme-pagarme'

const validateApiValues = (apiValues) => {
  const { error } = Joi.validate(apiValues, apiValuesSchema)

  if (error) throw new Error(error.stack)

  return true
}

const render = apiValues => () => {
  const clientTarget = apiValues.configs.target

  const target = clientTarget
    ? document.getElementById(clientTarget)
    : createElement('div', 'checkout-wrapper', 'body')

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Checkout
        apiValues={{ ...apiValues }}
        targetElement={target}
      />
    </ThemeProvider>,
    target
  )
}

const renderSimpleIntegration = (button) => {
  const key = button.dataset.key

  const configs = {
    image: button.dataset.image,
    locale: button.dataset.locale,
    theme: button.dataset.theme,
  }

  const params = {
    amount: parseFloat(button.dataset.amount),
    paymentMethod: button.dataset.paymentMethod,
  }
  const apiValues = { key, configs, params }

  if (validateApiValues(apiValues)) {
    const open = render({ key, configs, params })

    button.addEventListener('click', (e) => {
      e.preventDefault()
      open()
    })
  }
}

const checkoutFormButtons = document.querySelectorAll('.checkout-button')
const isSimpleIntegration = checkoutFormButtons.length

if (isSimpleIntegration) {
  checkoutFormButtons.forEach(renderSimpleIntegration)
} else {
  window.Checkout = key => configs => params => () => {
    const apiValues = { key, configs, params }

    if (validateApiValues(apiValues)) {
      render(apiValues)()
    }
  }
}
