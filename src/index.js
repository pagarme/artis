import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import moment from 'moment'
import Colr from 'colr'
import {
  always,
  applySpec,
  equals,
  ifElse,
  prop,
  map,
  of,
  pipe,
  split,
} from 'ramda'
import 'moment/locale/pt-br'

import App from './App'
import createStore from './store'

import apiValidation from './utils/validations/apiValidation'
import createElement from './utils/helpers/createElement'
import DEFAULT_COLORS from './utils/data/colors'
import getStrategyName from './utils/strategies/getStrategyName'
import setColors from './utils/helpers/setColors'
import setTheme from './utils/helpers/setTheme'
import getParentElement from './utils/helpers/getParentElement'

moment.locale('pt-br')

const isDevelopment = () => process.env.NODE_ENV === 'development'

ReactGA.initialize('UA-113290482-1', {
  debug: isDevelopment(),
})

function createFormListener (button) {
  const form = getParentElement(button, 'form')

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
    })
  }

  return form
}

const openCheckout = (apiData, clientThemeBase, form) => {
  const {
    configs = {},
    key,
    token,
  } = apiData

  const { target = 'checkout-wrapper' } = configs

  const acquirerName = getStrategyName(apiData)

  const clientTarget = createElement('div', target, 'body')

  ReactGA.event({
    category: 'API',
    action: 'Customer Key',
    label: key || token,
  })

  const apiErrors = ifElse(
    equals('pagarme'),
    apiValidation(apiData),
    always([]),
  )(acquirerName)

  const store = createStore(apiData)

  ReactDOM.render(
    <App
      acquirerName={acquirerName}
      apiData={apiData}
      apiErrors={apiErrors}
      clientTarget={clientTarget}
      clientThemeBase={clientThemeBase}
      form={form}
      store={store}
    />,
    clientTarget
  )
}

const preRender = (apiData, form = null) => {
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

  const bColor = backgroundColor || defaulBackgroundColor
  const pColor = primaryColor || defaultPrimaryColor
  const sColor = secondaryColor || (
    pColor === defaultPrimaryColor
      ? defaultSecondaryColor
      : Colr.fromHex(pColor).darken(30).toHex()
  )

  setColors(pColor, sColor, bColor)

  return {
    apiData: {
      callbacks: {},
      ...apiData,
    },
    setCallback: function setCallback (name, fn) {
      this.apiData.callbacks[name] = fn
    },
    onSuccess: function onSuccess (fn) {
      this.setCallback('onSuccess', fn)
      return this
    },
    onError: function onError (fn) {
      this.setCallback('onError', fn)
      return this
    },
    onClose: function onClose (fn) {
      this.setCallback('onClose', fn)
      return this
    },
    pages: function pages (fn) {
      this.setCallback('pages', fn)
      return this
    },
    open: function open () {
      openCheckout(this.apiData, clientThemeBase, form)
    },
  }
}

const parseToApiData = applySpec({
  key: prop('key'),
  configs: applySpec({
    logo: prop('logo'),
    primaryColor: prop('primaryColor'),
    backgroundColor: prop('backgroundColor'),
    secondaryColor: prop('secondaryColor'),
    themeBase: prop('themeBase'),
    createTransaction: prop('createTransaction'),
  }),
  transaction: applySpec({
    amount: prop('amount'),
    paymentMethod: pipe(
      prop('paymentMethod'),
      split(','),
      map(of),
    ),
  }),
})

function createButtonListener (buttons) {
  buttons.forEach((button) => {
    const apiData = parseToApiData(button.dataset)

    const form = createFormListener(button)

    button.addEventListener('click', () => {
      preRender(apiData, form).open()
    })
  })
}

const checkoutFormButtons = document.querySelectorAll('.checkout-button')
const isSimpleIntegration = checkoutFormButtons.length

if (isSimpleIntegration) {
  createButtonListener(checkoutFormButtons)
}

window.createPanelEnvironment = (buttons) => {
  createButtonListener(buttons)
}

window.createCheckout = (data) => {
  const apiData = isSimpleIntegration
    ? parseToApiData(data.dataset)
    : data

  return preRender(apiData)
}
