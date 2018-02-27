const defaultState = {
  isFormVisible: false,
}

const shippingPage = (state = defaultState, action) => {
  const {
    isFormVisible,
    addressToUpdate,
    confirmMethod,
    type,
  } = action

  switch (type) {
    case 'SHOW_ADDRESS_FORM':
      return {
        ...state,
        isFormVisible,
      }

    case 'ADD_SELECTED_ADDRESS':
      return {
        ...state,
        addressToUpdate,
      }

    case 'CHANGE_CONFIRM_METHOD':
      return {
        ...state,
        confirmMethod,
      }

    default:
      return state
  }
}

export default shippingPage
