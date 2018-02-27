import { combineReducers } from 'redux'
import screenSize from './screenSize'
import pageInfo from './pageInfo'
import shippingPage from './shippingPage'
import showFooterButton from './showFooterButton'
import showProgressBar from './showProgressBar'

const checkoutReducer = combineReducers({
  screenSize,
  pageInfo,
  showFooterButton,
  showProgressBar,
  shippingPage,
})

export default checkoutReducer
