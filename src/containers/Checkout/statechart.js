export default {
  initial: 'customer',
  pages: {
    customer: 'Identificação',
    billing: 'Endereço de Cobrança',
    shipping: 'Endereço de Entrega',
    payment: 'Forma de Pagamento',
    confirmation: 'Confirmação',
  },
  states: {
    customer: {
      on: {
        NEXT: {
          billing: {
            cond: extState => !extState.isBigScreen,
          },
          shipping: {
            cond: extState => extState.isBigScreen,
          },
        },
      },
      onEntry: 'customer',
    },
    billing: {
      on: {
        PREV: 'customer',
        NEXT: 'shipping',
      },
      onEntry: 'billing',
    },
    shipping: {
      on: {
        PREV: {
          billing: {
            cond: extState => !extState.isBigScreen,
          },
          customer: {
            cond: extState => extState.isBigScreen,
          },
        },
        NEXT: 'payment',
      },
      onEntry: 'shipping',
    },
    payment: {
      on: {
        PREV: 'shipping',
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
