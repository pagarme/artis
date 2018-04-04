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
        NEXT: 'confirmation',
        SINGLE_CREDITCARD: 'singleCreditCard',
        SINGLE_BOLETO: 'singleBoleto',
        CREDITCARD_AND_BOLETO: 'creditCardAndBoleto',
        MULTIPLE_CREDITCARDS: 'multipleCreditCards',
      },
    },
    singleCreditCard: {
      on: {
        PREV: 'payment',
        NEXT: 'confirmation',
      },
      onEntry: ['singleCreditCard'],
    },
    singleBoleto: {
      on: {
        PREV: 'payment',
        NEXT: 'confirmation',
      },
      onEntry: ['singleBoleto'],
    },
    creditCardAndBoleto: {
      on: {
        PREV: 'payment',
        NEXT: 'confirmation',
      },
      onEntry: ['creditCardAndBoleto'],
    },
    multipleCreditCards: {
      on: {
        PREV: 'payment',
        NEXT: 'confirmation',
      },
      onEntry: ['multipleCreditCards'],
    },
    confirmation: {
      on: {
        PREV: 'payment',
      },
    },
  },
}
