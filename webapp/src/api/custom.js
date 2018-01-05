import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'react-css-themr'

import Checkout from '../components/Checkout'

import theme from '../theme-pagarme'

const customIntegration = key => configs => params => () => {
  if (!key) throw new Error('The "key" parameter is required.')

  const target = document.getElementById(configs.target)
  ReactDOM.render(
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
    target
  )
}

export default customIntegration
