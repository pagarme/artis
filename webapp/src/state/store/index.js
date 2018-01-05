import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'
import { createLogger } from 'redux-logger'

import reducers from '../reducers'

const logger = createLogger()

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  compose(
    applyMiddleware(logger)
  )
)

export default store
