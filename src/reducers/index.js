import { combineReducers } from 'redux'
import screenSize from './screenSize'
import pageInfo from './pageInfo'

const checkoutReducer = combineReducers({
  screenSize,
  pageInfo,
})

export default checkoutReducer
