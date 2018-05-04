import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import moment from 'moment'
import 'moment/locale/pt-br'

import App from './App'
import createStore from './store'

import apiValidation from './utils/validations/apiValidation'
import createElement from './utils/helpers/createElement'
import setTheme from './utils/helpers/setTheme'
import setColors from './utils/helpers/setColors'
import DEFAULT_COLORS from './utils/data/colors'
import getStrategyName from './utils/strategies/getStrategyName'
import { getTokenData } from './utils/strategies/mundipagg'

import defaultLogo from './images/logo_pagarme.png'

moment.locale('pt-br')

ReactGA.initialize('UA-113290482-1')

const openCheckout = ({
  getMundipaggData,
  apiData,
  acquirer,
}) => {
  const {
    configs = {},
    customer,
    billing,
    shipping,
    cart,
    transaction = {},
    key,
  } = apiData

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

  const clientTarget = createElement('div', target, 'body')

  ReactGA.event({
    category: 'API',
    action: 'Customer Key',
    label: key,
  })

  let apiErrors

  if (acquirer === 'pagarme') {
    apiErrors = apiValidation(apiData)

    const store = createStore({
      customer,
      billing,
      shipping,
      cart,
      transaction,
    })

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
        apiErrors={apiErrors}
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
      const store = createStore(data)

      ReactDOM.render(
        <App
          apiData={data}
          apiErrors={apiErrors}
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

  const getMundipaggData = acquirer === 'mundipagg'
    ? getTokenData(apiData.token)
    : null

  return () => openCheckout({
    getMundipaggData,
    apiData,
    acquirer,
  })
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
    window.Checkout = apiData => preRender(apiData)
  },
}

const checkoutFormButtons = document.querySelectorAll('.checkout-button')
const isSimpleIntegration = checkoutFormButtons.length

window.CheckoutSimple = integrations.simple

if (isSimpleIntegration) {
  integrations.simple(checkoutFormButtons)
} else {
  integrations.custom()
}
