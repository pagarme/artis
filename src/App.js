import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ThemeProvider as ThemrProvider } from 'react-css-themr'
import { ThemeProvider } from 'former-kit'

import Checkout from './containers/Checkout'
import ErrorPage from './pages/Error'
import NormalizeCSS from './components/NormalizeCSS'
import ErrorBoundary from './components/ErrorBoundary'

import defaultTheme from './themes/default'

const App = ({
  apiData,
  store,
  acquirer,
  clientTarget,
  clientThemeBase,
}) => (
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
              apiData={apiData}
              acquirer={acquirer}
              targetElement={clientTarget}
              base={clientThemeBase}
            />
          </NormalizeCSS>
        </ErrorBoundary>
      </ThemrProvider>
    </ThemeProvider>
  </Provider>
)

App.propTypes = {
  apiData: PropTypes.shape().isRequired,
  store: PropTypes.shape().isRequired,
  acquirer: PropTypes.string.isRequired,
  clientTarget: PropTypes.shape().isRequired,
  clientThemeBase: PropTypes.string.isRequired,
}

export default App
