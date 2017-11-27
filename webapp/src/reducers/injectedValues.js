import INJECTED_VALUES from '../constants/ActionTypes'

const defaultState = {
  key: '',
  configs: {},
  params: {},
}

const injectedValues = (state = defaultState, action = {}) => {
  switch (action.type) {
    case INJECTED_VALUES:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}

export default injectedValues
