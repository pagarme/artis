import { combineReducers } from 'redux'
import screenSize from './screenSize'
import pageInfo from './pageInfo'
import addressOptions from './addressOptions'
import showFooterButton from './showFooterButton'
import showProgressBar from './showProgressBar'

const checkoutReducer = combineReducers({
  screenSize,
  pageInfo,
  showFooterButton,
  showProgressBar,
  addressOptions,
})

export default checkoutReducer
