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

export const showProgressBar = payload => ({
  type: 'SHOW_PROGRESSBAR',
  payload,
})

export const showAddressForm = isFormVisible => ({
  type: 'SHOW_ADDRESS_FORM',
  isFormVisible,
})

export const addAddressToUpdate = addressToUpdate => ({
  type: 'ADD_SELECTED_ADDRESS',
  addressToUpdate,
})

// fala qual é o método que será usando no onConfirm do Form
export const changeConfirmMethod = confirmMethod => ({
  type: 'CHANGE_CONFIRM_METHOD',
  confirmMethod,
})

