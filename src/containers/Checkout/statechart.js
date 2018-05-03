export default {
  initial: 'customer',
  states: {
    customer: {
      on: {
        NEXT: 'billing',
      },
      onEntry: ['navigateToPage'],
    },
    billing: {
      on: {
        PREV: 'customer',
        NEXT: 'shipping',
        SAME_SHIPPING_ADDRESS: 'payment',
        DIFFERENT_SHIPPING_ADDRESS: 'shipping',
      },
      onEntry: ['navigateToPage'],
    },
    shipping: {
      on: {
        PREV: 'billing',
        PREV_FILLED_BILLING: 'customer',
        NEXT: 'payment',
      },
      onEntry: ['navigateToPage'],
    },
    payment: {
      on: {
        PREV_SAME_SHIPPING_ADDRESS: 'billing',
        PREV_DIFFERENT_SHIPPING_ADDRESS: 'shipping',
        NEXT: 'transaction',
        SINGLE_CREDITCARD: 'singleCreditCard',
        SINGLE_BOLETO: 'singleBoleto',
        CREDITCARD_AND_BOLETO: 'creditCardAndBoleto',
        MULTIPLE_CREDITCARDS: 'multipleCreditCards',
      },
    },
    singleCreditCard: {
      on: {
        PREV: 'payment',
        NEXT: 'transaction',
      },
    },
    singleBoleto: {
      on: {
        PREV: 'payment',
        NEXT: 'transaction',
      },
    },
    creditCardAndBoleto: {
      on: {
        PREV: 'payment',
        NEXT: 'transaction',
      },
    },
    multipleCreditCards: {
      on: {
        PREV: 'payment',
        NEXT: 'transaction',
      },
    },
    transaction: {
      on: {
        TRANSACTION_SUCCESS: {
          confirmation: {
            actions: ['onTransactionSuccess'],
          },
        },
        TRANSACTION_FAILURE: {
          confirmation: {
            actions: ['onTransactionError'],
          },
        },
      },
      onEntry: 'enterLoading',
    },
    confirmation: {
      on: {
        PREV: 'payment',
      },
    },
  },
}
