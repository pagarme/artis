import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'former-kit'

import Checkout from './containers/Checkout'
import ErrorPage from './pages/Error'
import NormalizeCSS from './components/NormalizeCSS'
import LoadingInfo from './components/LoadingInfo'
import ErrorBoundary from './components/ErrorBoundary'

import defaultTheme from './themes/default'

const App = ({
  apiData,
  apiErrors,
  store,
  acquirer,
  clientTarget,
  clientThemeBase,
  installments,
  loadingScreen,
  loadingTitle,
  loadingSubtitle,
}) => (
  <Provider store={store}>
    <ThemeProvider theme={{
      name: 'Checkout Theme',
      styles: defaultTheme,
    }}
    >
      <ErrorBoundary CrashReportComponent={<ErrorPage />}>
        <NormalizeCSS>
          {
            loadingScreen
              ? <LoadingInfo
                title={loadingTitle}
                subtitle={loadingSubtitle}
                fullscreen
              />
              : <Checkout
                apiData={apiData}
                apiErrors={apiErrors}
                acquirer={acquirer}
                installments={installments}
                targetElement={clientTarget}
                base={clientThemeBase}
              />
          }
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
  installments: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingScreen: PropTypes.bool,
  loadingTitle: PropTypes.string.isRequired,
  loadingSubtitle: PropTypes.string.isRequired,
}

App.defaultProps = {
  apiErrors: [],
  loadingScreen: false,
}

export default App
