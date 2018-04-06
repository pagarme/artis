import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import { ThemeProvider as ThemrProvider } from 'react-css-themr'
import { Provider } from 'react-redux'
import moment from 'moment'
import 'moment/locale/pt-br'
import { ThemeProvider } from 'former-kit'

import Checkout from './containers/Checkout'
import ErrorBoundary from './components/ErrorBoundary'
import ErrorPage from './pages/Error'

import createElement from './utils/helpers/createElement'
import setTheme from './utils/helpers/setTheme'
import setColors from './utils/helpers/setColors'
import DEFAULT_COLORS from './utils/data/colors'
import { getStrategyName, mundipagg } from './utils/strategies'
import createStore from './store'

import NormalizeCSS from './components/NormalizeCSS'
import defaultTheme from './themes/default'
import defaultLogo from './images/logo_pagarme.png'

moment.locale('pt-br')

const { getTokenData } = mundipagg

ReactGA.initialize('UA-113290482-1')

const render = (apiData, {
  store,
  acquirer,
  clientTarget,
  clientThemeBase,
}) => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={{
        name: 'Checkout Theme',
        styles: defaultTheme,
      }}
      >
        <ThemrProvider theme={defaultTheme}>
          <ErrorBoundary CrashReportComponent={<ErrorPage />}>
            <NormalizeCSS>
              <Checkout
                apiData={apiDataWithDefaults}
                acquirer={acquirer}
                targetElement={clientTarget}
                base={clientThemeBase}
              />
            </NormalizeCSS>
          </ErrorBoundary>
        </ThemrProvider>
      </ThemeProvider>
    </Provider>,
    clientTarget
  )
}

const openCheckout = (getMundipaggData, apiData, acquirer) => {
  const {
    configs = {},
    formData = {},
    key,
  } = apiData

  const {
    target = 'checkout-wrapper',
    themeBase,
    primaryColor,
    secondaryColor,
  } = configs

  const clientThemeBase = themeBase || setTheme(primaryColor) || 'dark'

  const pColor = primaryColor || DEFAULT_COLORS[clientThemeBase].primary
  const sColor = secondaryColor || DEFAULT_COLORS[clientThemeBase].secondary

  setColors(pColor, sColor)

  const clientTarget = createElement('div', target, 'body')

  ReactGA.event({
    category: 'API',
    action: 'Customer Key',
    label: key,
  })

  const store = createStore(formData)

  const apiDataWithDefaults = {
    ...apiData,
    configs: {
      ...apiData.configs,
      image: apiData.configs.image || defaultLogo,
    },
  }

  const commonParams = {
    store,
    acquirer,
    clientTarget,
    clientThemeBase,
  }

  if (acquirer === 'pagarme') {
    return render(
      apiDataWithDefaults,
      commonParams
    )
  }

  return getMundipaggData
    .then((data) => {
      render(
        data,
        commonParams
      )
    })

const preRender = (apiData) => {
  const acquirer = getStrategyName(apiData)

  let getMundipaggData

  if (acquirer === 'mundipagg') {
    getMundipaggData = getTokenData(apiData.token)
  }

  return () => openCheckout(getMundipaggData, apiData, acquirer)
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
    window.Checkout = configs => preRender(configs)
  },
}

const checkoutFormButtons = document.querySelectorAll('.checkout-button')
const isSimpleIntegration = checkoutFormButtons.length

if (isSimpleIntegration) {
  integrations.simple(checkoutFormButtons)
} else {
  integrations.custom()
}
