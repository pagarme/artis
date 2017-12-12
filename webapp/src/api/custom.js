import React from 'react'
import ReactDOM from 'react-dom'

import App from '../components/App'

const customIntegration = key => configs => params => () => {
  if (!key) throw new Error('The "key" parameter is required.')

  ReactDOM.render(
    <App
      apiValues={{
        key,
        configs,
        params,
      }}
    />,
    document.getElementById(configs.target)
  )
}

export default customIntegration
