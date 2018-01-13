import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'
import { createLogger } from 'redux-logger'

import reducers from './reducers'

const middlewares = []

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger())
}

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  compose(
    applyMiddleware(...middlewares)
  )
)

export default store
