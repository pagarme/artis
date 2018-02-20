export const changeScreenSize = size => ({
  type: 'CHANGE_SCREEN_SIZE',
  size,
})

export const addPageInfo = payload => ({
  type: 'ADD_PAGE_INFO',
  payload,
})

export const showFooterButton = isVisible => ({
  type: 'SHOW_FOOTER_BUTTON',
  isVisible,
})

export const disableFooterButton = isDisable => ({
  type: 'DISABLE_FOOTER_BUTTON',
  isDisable,
})
