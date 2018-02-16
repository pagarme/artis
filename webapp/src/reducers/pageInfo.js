const defaultState = { }

const pageInfo = (state = defaultState, action) => {
  const { payload = {} } = action // default payload if none recieved by action

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
