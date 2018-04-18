import { combineReducers } from 'redux'
import screenSize from './screenSize'
import pageInfo from './pageInfo'
import transactionValues from './transactionValues'

const checkoutReducer = combineReducers({
  screenSize,
  pageInfo,
  transactionValues,
})

export default checkoutReducer
