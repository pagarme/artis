import { combineReducers } from 'redux'
import screenSize from './screenSize'
import pageInfo from './pageInfo'
import showProgressBar from './showProgressBar'

const checkoutReducer = combineReducers({
  screenSize,
  pageInfo,
  showProgressBar,
})

export default checkoutReducer
