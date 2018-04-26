import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'former-kit'

import Checkout from './containers/Checkout'
import ErrorPage from './pages/Error'
import NormalizeCSS from './components/NormalizeCSS'
import ErrorBoundary from './components/ErrorBoundary'

import defaultTheme from './themes/default'

const App = ({
  apiData,
  apiErrors,
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
      <ErrorBoundary CrashReportComponent={<ErrorPage />}>
        <NormalizeCSS>
          <Checkout
            apiData={apiData}
            apiErrors={apiErrors}
            acquirer={acquirer}
            targetElement={clientTarget}
            base={clientThemeBase}
          />
        </NormalizeCSS>
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>
)

App.propTypes = {
  apiData: PropTypes.shape().isRequired,
  apiErrors: PropTypes.arrayOf(PropTypes.string),
  store: PropTypes.shape().isRequired,
  acquirer: PropTypes.string.isRequired,
  clientTarget: PropTypes.shape().isRequired,
  clientThemeBase: PropTypes.string.isRequired,
}

App.defaultProps = {
  apiErrors: [],
}

export default App
