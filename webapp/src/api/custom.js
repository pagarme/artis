import React from 'react'
import ReactDOM from 'react-dom'

import Checkout from '../components/Checkout'

const customIntegration = key => configs => params => () => {
  if (!key) throw new Error('The "key" parameter is required.')

  ReactDOM.render(
    <Checkout
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
