import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { ThemeProvider } from 'react-css-themr'
import { Provider } from 'react-redux'

import Checkout from './containers/Checkout'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorPage from './pages/Error'

import createElement from './utils/helpers/createElement'
import setTheme from './utils/helpers/setTheme'
import setColors from './utils/helpers/setColors'
import createStore from './store'

import NormalizeCSS from './components/NormalizeCSS'
import defaultTheme from './themes/default'

const colors = {
  light: {
    primary: '#81cc04',
    secondary: '#64a100',
  },
  dark: {
    primary: '#7ad499',
    secondary: '#46b67c',
  },
}

ReactGA.initialize('UA-113290482-1')

const render = apiData => () => {
  const {
    configs,
    formData,
    key,
  } = apiData

  const {
    target,
    themeBase,
    primaryColor,
    secondaryColor,
  } = configs

  const theme = themeBase || setTheme(primaryColor) || 'dark'

  const pColor = primaryColor || colors[theme].primary
  const sColor = secondaryColor || colors[theme].secondary

  setColors(pColor, sColor)

  const clientTarget = target
    ? document.getElementById(target)
    : createElement('div', 'checkout-wrapper', 'body')

  ReactGA.event({
    category: 'API',
    action: 'Customer Key',
    label: key,
  })

  const store = createStore(formData)

  const clientThemeBase = themeBase || setTheme(primaryColor) || 'dark'

  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <ErrorBoundary CrashReportComponent={<ErrorPage />}>
          <NormalizeCSS>
            <Checkout
              apiData={apiData}
              targetElement={clientTarget}
              base={clientThemeBase}
            />
          </NormalizeCSS>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>,
    clientTarget
  )
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

      const open = render({ key, configs, params })

      button.addEventListener('click', (e) => {
        e.preventDefault()
        open()
      })
    })
  },
  custom: () => {
    window.Checkout = ({ key, configs, formData, transaction }) => () => {
      render({ key, configs, formData, transaction })()
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
