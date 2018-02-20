import { combineReducers } from 'redux'
import screenSize from './screenSize'
import pageInfo from './pageInfo'
import showFooterButton from './showFooterButton'
import disableFooterButton from './disableFooterButton'

const checkoutReducer = combineReducers({
  screenSize,
  pageInfo,
  showFooterButton,
  disableFooterButton,
})

export default checkoutReducer
