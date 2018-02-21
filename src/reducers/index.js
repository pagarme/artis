import { combineReducers } from 'redux'
import screenSize from './screenSize'
import pageInfo from './pageInfo'
import showFooterButton from './showFooterButton'

const checkoutReducer = combineReducers({
  screenSize,
  pageInfo,
  showFooterButton,
})

export default checkoutReducer
