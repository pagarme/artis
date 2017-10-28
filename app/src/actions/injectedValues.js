import { INJECTED_VALUES } from '../constants/ActionTypes'

export const injectedValues = payload => ({
  type: INJECTED_VALUES,
  payload
})
