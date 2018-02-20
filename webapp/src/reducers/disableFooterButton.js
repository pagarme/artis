const defaultState = true

const disableFooterButton = (state = defaultState, action) => {
  const { isDisable, type } = action

  switch (type) {
    case 'DISABLE_FOOTER_BUTTON':
      return isDisable

    default:
      return state
  }
}

export default disableFooterButton
