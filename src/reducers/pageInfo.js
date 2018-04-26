const defaultState = { }

const pageInfo = (state = defaultState, action) => {
  const { payload = {} } = action

  switch (action.type) {
    case 'ADD_PAGE_INFO':
      return {
        ...state,
        [payload.page]: payload.pageInfo,
      }

    default:
      return state
  }
}

export default pageInfo
