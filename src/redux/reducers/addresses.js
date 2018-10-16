const defaultState = { sameAddressForShipping: true }

const addresses = (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_SAME_ADDRESS_FOR_SHIPPING':
      return {
        sameAddressForShipping: !state.sameAddressForShipping,
      }

    default:
      return state
  }
}

export default addresses
