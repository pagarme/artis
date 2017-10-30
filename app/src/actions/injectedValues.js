import INJECTED_VALUES from '../constants/ActionTypes'

const injectedValues = payload => ({
  type: INJECTED_VALUES,
  payload,
})

export default injectedValues
