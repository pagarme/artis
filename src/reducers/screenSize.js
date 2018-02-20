const defaultState = {
  isBigScreen: true,
}

const screenSize = (state = defaultState, action) => {
  switch (action.type) {
    case 'CHANGE_SCREEN_SIZE':
      return {
        ...state,
        isBigScreen: action.size > 640,
      }

    default:
      return state
  }
}

export default screenSize
