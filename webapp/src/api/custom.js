import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from '../components/App'
import store from '../store'
import injectedValues from '../actions'

const updateModal = params => params

const customIntegration = key => configs => params => () => {
  if (!key) throw new Error('The "key" parameter is required.')

  store.dispatch(
    injectedValues({
      key,
      configs,
      params,
    }),
    updateModal({ visible: true })
  )

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(configs.target)
  )
}

export default customIntegration
