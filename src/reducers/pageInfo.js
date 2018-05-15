import { merge } from 'ramda'

const defaultState = {}

const formatDataToLocalStorage = (payload, state) => {
  if (payload.page === 'payment') {
    return state
  }

  return JSON.stringify(
    merge(state, {
      [payload.page]: payload.pageInfo,
    })
  )
}

const pageInfo = (state = defaultState, action) => {
  const { payload = {} } = action

  switch (action.type) {
    case 'ADD_PAGE_INFO': {
      localStorage.setItem('pageInfo', formatDataToLocalStorage(
        payload,
        state
      ))

      return {
        ...state,
        [payload.page]: payload.pageInfo,
      }
    }

    default:
      return state
  }
}

export default pageInfo
