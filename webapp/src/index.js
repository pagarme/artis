import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'react-css-themr'

import Checkout from './containers/Checkout'
import createElement from './utils/createElement'

import theme from './theme-pagarme'

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

  const open = render({ key, configs, params })

  button.addEventListener('click', (e) => {
    e.preventDefault()
    open()
  })
}

const checkoutFormButtons = document.querySelectorAll('.checkout-button')
const isSimpleIntegration = checkoutFormButtons.length

if (isSimpleIntegration) {
  checkoutFormButtons.forEach(renderSimpleIntegration)
} else {
  window.Checkout = key => configs => params => () => {
    if (!key) throw new Error('The "key" parameter is required.')

    render({ key, configs, params })()
  }
}
