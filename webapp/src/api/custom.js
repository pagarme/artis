import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'react-css-themr'

import Checkout from '../components/Checkout'
import store from '../state/store'

import theme from '../theme-pagarme'

const customIntegration = key => configs => params => () => {
  if (!key) throw new Error('The "key" parameter is required.')

  const target = document.getElementById(configs.target)

  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Checkout
          apiValues={{
            key,
            configs,
            params,
          }}
          targetElement={target}
        />
      </ThemeProvider>,
    </Provider>,
    target
  )
}

export default customIntegration
