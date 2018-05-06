import { combineReducers } from 'redux'
import screenSize from './screenSize'
import pageInfo from './pageInfo'
import transactionValues from './transactionValues'
import cart from './cart'

const checkoutReducer = combineReducers({
  screenSize,
  pageInfo,
  transactionValues,
  cart,
})

export default checkoutReducer
