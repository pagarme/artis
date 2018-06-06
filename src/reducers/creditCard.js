const defaultState = {}

const creditCard = (state = defaultState, action) => {
  const { payload = {} } = action

  switch (action.type) {
    case 'ADD_CREDIT_CARD':
      return {
        ...state,
        ...payload,
      }
    case 'UPDATE_CARD_ID':
      return {
        ...state,
        cardId: payload.id,
      }

    default:
      return state
  }
}

export default creditCard
