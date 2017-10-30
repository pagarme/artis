import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import reducers from '../reducers'

const logger = createLogger()

export default createStore(
  combineReducers({
    ...reducers,
  }),
  compose(
    applyMiddleware(logger)
  )
)
