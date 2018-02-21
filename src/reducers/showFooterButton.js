const defaultState = true

const showFooterButton = (state = defaultState, action) => {
  const { isVisible = state } = action

  switch (action.type) {
    case 'SHOW_FOOTER_BUTTON':
      return isVisible

    default:
      return state
  }
}

export default showFooterButton
