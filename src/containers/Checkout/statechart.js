export default {
  initial: 'customer',
  states: {
    customer: {
      on: {
        NEXT: 'addresses',
      },
      onEntry: ['navigateToPage'],
    },
    addresses: {
      on: {
        PREV: 'customer',
        NEXT: 'payment',
      },
      onEntry: ['navigateToPage'],
    },
    payment: {
      on: {
        PREV: 'addresses',
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
