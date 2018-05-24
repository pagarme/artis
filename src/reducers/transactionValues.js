import { merge } from 'ramda'

const defaultState = {
  amount: 0,
  defaultMethod: 'boleto',
  paymentMethods: [],
  paymentConfig: {
    boleto: {},
    creditcard: {
      installments: [{
        free: 10,
        initial: 2,
        max: 10,
      }],
    },
  },
}

const transactionValues = (state = defaultState, action) => {
  const { payload = {} } = action

  switch (action.type) {
    case 'DECREMENT_FINAL_AMOUNT':
      return {
        ...state,
        finalAmount: state.amount - payload,
      }
    case 'INCREMENT_FINAL_AMOUNT':
      return {
        ...state,
        finalAmount: payload + state.amount,
      }
    case 'RESET_FINAL_AMOUNT':
      return {
        ...state,
        finalAmount: state.amount,
      }

    default:
      return merge(defaultState, state)
  }
}

export default transactionValues
