import React from 'react'
import ReactDOM from 'react-dom'
import Joi from 'joi-browser'
import ReactGA from 'react-ga'
import { ThemeProvider } from 'react-css-themr'
import { Provider } from 'react-redux'

import Checkout from './containers/Checkout'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorPage from './pages/Error'

import createElement from './utils/helpers/createElement'
import apiDataSchema from './utils/schemas/apiData'
import createStore from './store'

import theme from './theme-pagarme'

ReactGA.initialize('UA-113290482-1')

const validateApiData = (apiData) => {
  const { error } = Joi.validate(apiData, apiDataSchema)

  if (error) throw new Error(error.stack)

  return true
}

const render = apiData => () => {
  const clientTarget = apiData.configs.target

  const target = clientTarget
    ? document.getElementById(clientTarget)
    : createElement('div', 'checkout-wrapper', 'body')

  ReactGA.event({
    category: 'API',
    action: 'Customer Key',
    label: apiData.key,
  })

  const store = createStore(apiData.formData)

  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary CrashReportComponent={<ErrorPage />}>
          <Checkout
            apiData={apiData}
            targetElement={target}
          />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>,
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

      const apiData = { key, configs, params }

      if (validateApiData(apiData)) {
        const open = render({ key, configs, params })

        button.addEventListener('click', (e) => {
          e.preventDefault()
          open()
        })
      }
    })
  },
  custom: () => {
    window.Checkout = apiData => () => {
      if (validateApiData(apiData)) render(apiData)()
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
