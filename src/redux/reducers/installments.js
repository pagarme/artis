const defaultState = {}

const installments = (state = defaultState, action) => {
  const { payload = {} } = action

  switch (action.type) {
    case 'ADD_INSTALLMENTS':
      return {
        ...payload,
      }

    default:
      return state
  }
}

export default installments
