import { createStore, applyMiddleware } from 'redux'
import { path, prop } from 'ramda'
import reducers from './reducers'

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger') // eslint-disable-line
  middlewares.push(logger)
}

export default ({
  configs,
  customer,
  shipping,
  billing,
  cart,
  transaction,
}) =>
  createStore(
    reducers,
    {
      creditCard: {
        cardId: path(['cardId'], configs),
      },
      pageInfo: {
        customer,
        shipping,
        billing,
        cart,
      },
      transactionValues: {
        ...transaction,
        finalAmount: prop('amount', transaction),
      },
    },
    applyMiddleware(...middlewares)
  )
