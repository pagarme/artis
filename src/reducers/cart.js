const defaultState = { collapsed: true }

const pageInfo = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return {
        collapsed: !state.collapsed,
      }

    default:
      return state
  }
}

export default pageInfo
