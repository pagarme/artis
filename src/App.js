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
  acquirerName,
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
            acquirerName={acquirerName}
            apiData={apiData}
            apiErrors={apiErrors}
            base={clientThemeBase}
            targetElement={clientTarget}
          />
        </NormalizeCSS>
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>
)

App.propTypes = {
  acquirerName: PropTypes.string.isRequired,
  apiData: PropTypes.shape().isRequired,
  apiErrors: PropTypes.arrayOf(PropTypes.string),
  clientTarget: PropTypes.shape().isRequired,
  clientThemeBase: PropTypes.string.isRequired,
  store: PropTypes.shape().isRequired,
}

App.defaultProps = {
  apiErrors: [],
  loadingScreen: false,
}

export default App
