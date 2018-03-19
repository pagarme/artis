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
      onEntry: ['checkRequiredData', 'customer'],
    },
    addresses: {
      on: {
        PREV: 'customer',
        NEXT: 'payment',
      },
      onEntry: ['checkRequiredData', 'addresses'],
    },
    payment: {
      on: {
        PREV: 'addresses',
        NEXT: 'confirmation',
      },
      onEntry: 'payment',
    },
    confirmation: {
      on: {
        PREV: 'payment',
      },
      onEntry: 'confirmation',
    },
  },
}
