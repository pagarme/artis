import { combineReducers } from 'redux'
import pageInfo from './pageInfo'
import transactionValues from './transactionValues'
import cart from './cart'

const checkoutReducer = combineReducers({
  pageInfo,
  transactionValues,
  cart,
})

export default checkoutReducer
