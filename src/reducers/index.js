import { combineReducers } from 'redux'
import pageInfo from './pageInfo'
import transactionValues from './transactionValues'
import cart from './cart'
import installments from './installments'

const checkoutReducer = combineReducers({
  pageInfo,
  transactionValues,
  cart,
  installments,
})

export default checkoutReducer
