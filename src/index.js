import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import moment from 'moment'
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
import createStore from './redux/store'

import apiValidation from './utils/validations/apiValidation'
import createElement from './utils/helpers/createElement'
import getStrategyName from './utils/strategies/getStrategyName'
import getColors from './utils/helpers/getColors'
import setTheme from './utils/helpers/setTheme'
import setColors from './utils/helpers/setColors'
import getParentElement from './utils/helpers/getParentElement'
import { insertRelativePosition } from './utils/helpers/bodyCss'

moment.locale('pt-br')

const isDevelopment = () => process.env.NODE_ENV === 'development'

ReactGA.initialize('UA-44419105-12', {
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

const openCheckout = (apiData, clientThemeBase, form, colors) => {
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

  insertRelativePosition()

  ReactDOM.render(
    <App
      acquirerName={acquirerName}
      apiData={apiData}
      apiErrors={apiErrors}
      checkoutColors={colors}
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
    headerFooterColor,
  } = configs

  const clientThemeBase = themeBase || setTheme(primaryColor) || 'dark'

  const colors = getColors(
    clientThemeBase,
    themeBase,
    primaryColor,
    secondaryColor,
    backgroundColor,
    headerFooterColor
  )

  setColors(colors)

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
      openCheckout(this.apiData, clientThemeBase, form, colors)
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
    headerFooterColor: prop('headerFooterColor'),
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

window.createPanelEnvironment = (buttons) => {
  createButtonListener(buttons)
}

window.createCheckout = (data, isSimpleIntegration = false) => {
  const apiData = isSimpleIntegration
    ? parseToApiData(data.dataset)
    : data

  return preRender(apiData)
}

document.addEventListener('DOMContentLoaded', () => {
  const checkoutFormButtons = document.querySelectorAll('.checkout-button')
  const isSimpleIntegration = checkoutFormButtons.length

  if (isSimpleIntegration) {
    createButtonListener(checkoutFormButtons, true)
  }
})
