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
      },
    },
    confirmation: {
      on: {
        PREV: 'payment',
      },
    },
  },
}
