export default {
  initial: 'customer',
  pages: {
    customer: 'Identificação',
    addresses: 'Endereços',
    payment: 'Forma de Pagamento',
    confirmation: 'Confirmação',
  },
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
