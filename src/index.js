import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import moment from 'moment'
import { always, equals, ifElse, pipe, split, map, merge, of } from 'ramda'
import 'moment/locale/pt-br'

import App from './App'
import createStore from './store'

import apiValidation from './utils/validations/apiValidation'
import createElement from './utils/helpers/createElement'
import setTheme from './utils/helpers/setTheme'
import setColors from './utils/helpers/setColors'
import DEFAULT_COLORS from './utils/data/colors'
import strategies from './utils/strategies'
import getStrategyName from './utils/strategies/getStrategyName'

moment.locale('pt-br')

ReactGA.initialize('UA-113290482-1')

const renderLoading = (target) => {
  ReactDOM.render(
    <App
      loadingScreen
      loadingTitle="Carregando"
      loadingSubtitle="Aguarde..."
    />,
    target
  )
}

const unrenderLoading = (target) => {
  ReactDOM.unmountComponentAtNode(target)
}

const openCheckout = (apiData, clientThemeBase) => {
  const {
    configs = {},
    key,
    token,
  } = apiData

  const { target = 'checkout-wrapper' } = configs

  const acquirerName = getStrategyName(apiData)
  const acquirer = strategies[acquirerName]

  const clientTarget = createElement('div', target, 'body')

  ReactGA.event({
    category: 'API',
    action: 'Customer Key',
    label: key || token,
  })

  const apiErrors = ifElse(
    equals('pagarme'),
    always(apiValidation(apiData)),
    always([]),
  )(acquirer)

  renderLoading(clientTarget)

  acquirer.prepare(apiData)
    .then((response) => {
      const [checkoutData, installments] = response

      const store = createStore(checkoutData)
      const data = merge(checkoutData, { key, token, configs })

      unrenderLoading(clientTarget)

      ReactDOM.render(
        <App
          apiData={data}
          apiErrors={apiErrors}
          store={store}
          acquirer={acquirerName}
          installments={installments}
          clientTarget={clientTarget}
          clientThemeBase={clientThemeBase}
        />,
        clientTarget
      )
    })
}

const preRender = (apiData) => {
  const { configs = {} } = apiData

  const {
    themeBase,
    primaryColor,
    secondaryColor,
    backgroundColor,
  } = configs

  const clientThemeBase = themeBase || setTheme(primaryColor) || 'dark'

  const defaultPrimaryColor = DEFAULT_COLORS[clientThemeBase].primary
  const defaultSecondaryColor = DEFAULT_COLORS[clientThemeBase].secondary
  const defaulBackgroundColor = DEFAULT_COLORS[clientThemeBase].backgroundColor

  const pColor = primaryColor || defaultPrimaryColor
  const sColor = secondaryColor || defaultSecondaryColor
  const bColor = backgroundColor || defaulBackgroundColor

  setColors(pColor, sColor, bColor)

  return () => openCheckout(apiData, clientThemeBase)
}

const integrations = {
  simple: (buttons) => {
    buttons.forEach((button) => {
      const {
        createTransaction,
        key,
        logo,
        themeBase = 'dark',
        primaryColor,
        secondaryColor,
        backgroundColor,
        amount = '0',
        paymentMethod = 'creditcard,boleto',
      } = button.dataset

      const configs = {
        backgroundColor,
        createTransaction,
        logo,
        primaryColor,
        secondaryColor,
        themeBase,
      }

      const generatePaymentMethods = pipe(
        split('.'),
        map(of)
      )

      const paymentMethods = generatePaymentMethods(paymentMethod)

      const transaction = {
        amount: parseFloat(amount),
        paymentMethods,
      }

      const open = preRender({
        key,
        configs,
        transaction,
      })

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
