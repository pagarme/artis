import { merge } from 'ramda'

const defaultState = {
  amount: 0,
  defaultMethod: 'boleto',
  paymentMethods: [],
  paymentConfig: {
    boleto: {},
    creditcard: {
      installments: [],
    },
  },
}

const transactionValues = (state = defaultState, action) => {
  const { payload = 0 } = action

  switch (action.type) {
    case 'UPDATE_FINAL_AMOUNT':
      return {
        ...state,
        finalAmount: payload,
      }

    default:
      return merge(defaultState, state)
  }
}

export default transactionValues
