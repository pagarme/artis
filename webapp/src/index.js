import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'react-css-themr'
import Joi from 'joi-browser'
import ReactGA from 'react-ga'

import Checkout from './containers/Checkout'
import ErrorBoundary from './components/ErrorBoundary'

import createElement from './utils/createElement'
import apiValuesSchema from './utils/schemas/apiValues'

import theme from './theme-pagarme'

ReactGA.initialize('UA-113290482-1')

const TempErrorComponent = () => (
  <div>
    <h1>Catch Exception</h1>
    <a target="blank" href="https://sentry.io/share/issue/efdacacc55724040930018482a612de9/">See the log!</a>
  </div>
)

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

  ReactGA.event({
    category: 'API',
    action: 'Customer Key',
    label: apiValues.key,
  })

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <ErrorBoundary CrashReportComponent={<TempErrorComponent />}>
        <Checkout
          apiValues={apiValues}
          targetElement={target}
        />
      </ErrorBoundary>
    </ThemeProvider>,
    target
  )
}

const integrations = {
  simple: (buttons) => {
    buttons.forEach((button) => {
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
    })
  },
  custom: () => {
    window.Checkout = key => configs => params => () => {
      const apiValues = { key, configs, params }

      if (validateApiValues(apiValues)) {
        render(apiValues)()
      }
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
