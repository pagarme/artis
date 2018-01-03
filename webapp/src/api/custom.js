import React from 'react'
import ReactDOM from 'react-dom'

import Checkout from '../components/Checkout'

const customIntegration = key => configs => params => () => {
  if (!key) throw new Error('The "key" parameter is required.')

  const target = document.getElementById(configs.target)
  ReactDOM.render(
    <Checkout
      apiValues={{
        key,
        configs,
        params,
      }}
      targetElement={target}
    />,
    target
  )
}

export default customIntegration
