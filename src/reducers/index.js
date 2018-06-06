import { combineReducers } from 'redux'
import pageInfo from './pageInfo'
import transactionValues from './transactionValues'
import cart from './cart'
import creditCard from './creditCard'
import installments from './installments'

const checkoutReducer = combineReducers({
  pageInfo,
  transactionValues,
  cart,
  creditCard,
  installments,
})

export default checkoutReducer
