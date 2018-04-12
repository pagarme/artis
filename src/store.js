import { createStore, applyMiddleware } from 'redux'

import reducers from './reducers'

const middlewares = []

if (process.env.NODE_ENV !== 'development') {
  const { logger } = require('redux-logger') // eslint-disable-line
  middlewares.push(logger)
}

export default ({
  customer,
  shipping,
  billing,
  cart,
  transaction,
}) =>
  createStore(
    reducers,
    {
      pageInfo: {
        customer,
        shipping,
        billing,
        cart,
      },
      transactionValues: {
        ...transaction,
      },
    },
    applyMiddleware(...middlewares)
  )
