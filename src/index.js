import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import moment from 'moment'
import 'moment/locale/pt-br'

import App from './App'
import createStore from './store'

import createElement from './utils/helpers/createElement'
import setTheme from './utils/helpers/setTheme'
import setColors from './utils/helpers/setColors'
import DEFAULT_COLORS from './utils/data/colors'
import getStrategyName from './utils/strategies/getStrategyName'
import { getTokenData } from './utils/strategies/mundipagg'

import defaultLogo from './images/logo_pagarme.png'

moment.locale('pt-br')

ReactGA.initialize('UA-113290482-1')

const openCheckout = (getMundipaggData, apiData, acquirer) => {
  const {
    configs = {},
    customer,
    billing,
    shipping,
    cart,
    transaction,
    key,
  } = apiData

  const { items } = transaction

  const {
    target = 'checkout-wrapper',
    themeBase,
    primaryColor,
    secondaryColor,
    backgroundColor,
    image,
  } = configs

  const clientThemeBase = themeBase || setTheme(primaryColor) || 'dark'

  const defaultPrimaryColor = DEFAULT_COLORS[clientThemeBase].primary
  const defaultSecondaryColor = DEFAULT_COLORS[clientThemeBase].secondary
  const defaulBackgroundColor = DEFAULT_COLORS[clientThemeBase].backgroundColor

  const pColor = primaryColor || defaultPrimaryColor
  const sColor = secondaryColor || defaultSecondaryColor
  const bColor = backgroundColor || defaulBackgroundColor

  setColors(pColor, sColor, bColor)

  const clientTarget = target
    ? document.getElementById(target)
    : createElement('div', 'checkout-wrapper', 'body')

  ReactGA.event({
    category: 'API',
    action: 'Customer Key',
    label: key,
  })

  let store

  if (acquirer === 'pagarme') {
    store = createStore({ customer, billing, shipping, cart, items })

    const apiDataWithDefaults = {
      ...apiData,
      configs: {
        ...apiData.configs,
        image: image || defaultLogo,
      },
    }

    ReactDOM.render(
      <App
        apiData={apiDataWithDefaults}
        store={store}
        acquirer={acquirer}
        clientTarget={clientTarget}
        clientThemeBase={clientThemeBase}
      />,
      clientTarget
    )
  }

  if (acquirer === 'mundipagg') {
    getMundipaggData.then((data) => {
      store = createStore({ customer, billing, shipping, cart, items })

      ReactDOM.render(
        <App
          apiData={data}
          store={store}
          acquirer={acquirer}
          clientTarget={clientTarget}
          clientThemeBase={clientThemeBase}
        />,
        clientTarget
      )
    })
  }
}

const preRender = (apiData) => {
  const acquirer = getStrategyName(apiData)

  let getMundipaggData

  if (acquirer === 'mundipagg') {
    getMundipaggData = getTokenData(apiData.token)
  }

  return () => openCheckout(getMundipaggData, apiData, acquirer)
}

const apiValidation = (apiData) => {
  const { key, transaction } = apiData
  const { amount } = transaction

  let errors

  if (!key) {
    errors = 'The "key" parameter is required.\n'
  }

  if (!amount) {
    errors += 'The "amount" parameter is required.\n'
  }

  if (typeof amount !== 'number') {
    errors += 'The "amount" parameter should be number.'
  }

  return errors
}

const integrations = {
  simple: (buttons) => {
    buttons.forEach((button) => {
      const {
        key,
        image,
        locale,
        theme,
        amount,
        paymentMethod,
      } = button.dataset

      const configs = {
        image,
        locale,
        theme,
      }

      const params = {
        amount: parseFloat(amount),
        paymentMethod,
      }

      const open = preRender({ key, configs, params })

      button.addEventListener('click', (e) => {
        e.preventDefault()
        open()
      })
    })
  },
  custom: () => {
    window.Checkout = (apiData) => {
      const apiErrors = apiValidation(apiData)

      if (apiErrors) {
        throw new Error(apiErrors)
      }

      return preRender(apiData)
    }
  },
}

const checkoutFormButtons = document.querySelectorAll('.checkout-button')
const isSimpleIntegration = checkoutFormButtons.length

if (isSimpleIntegration) {
  integrations.simple(checkoutFormButtons)
} else {
  integrations.custom()
}
