import { merge } from 'ramda'

const defaultState = {
  amount: 0,
  defaultMethod: 'boleto',
  paymentMethods: [],
  paymentConfig: {
    boleto: {},
    creditcard: {
      installments: {
        initial: 1,
        max: 1,
      },
    },
  },
}

const transactionValues = (state = defaultState, action) => {
  const { payload = state.amount } = action

  switch (action.type) {
    case 'UPDATE_FINAL_AMOUNT':
      return {
        ...state,
        finalAmount: payload,
      }

    case 'ADD_TRANSACTIONS_VALUES':
      return {
        ...state,
        amount: payload.amount,
        defaultMethod: payload.defaultMethod || state.defaultMethod,
        paymentConfig: payload.paymentConfig || state.paymentConfig,
      }

    default:
      return merge(defaultState, state)
  }
}

export default transactionValues
