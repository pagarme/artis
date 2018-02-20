/* eslint-disable no-underscore-dangle */
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import { createLogger } from 'redux-logger'

import reducers from './reducers'

const middlewares = []

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger())
}

export default ({ customer, shipping, billing }) => createStore(
  reducers,
  { pageInfo: { customer, shipping, billing } },
  compose(
    applyMiddleware(...middlewares)
  )
)
