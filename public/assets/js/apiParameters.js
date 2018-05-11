/* eslint-disable */
const pagarmeApi = `var configs = {
  key: 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz',
  configs: {
    companyName: 'Pagar.me',
    logo: './pagarme.png',
    themeBase: 'dark',
    primaryColor: '#7ad499',
    secondaryColor: '#46b67c',
    backgroundColor: '#2b2b2b',
    postback: 'http://pagar.me',
    orderUrl: 'http://www.google.com',
    enableCart: true,
    onTransactionSuccess: (data) => {
      console.log('onTransactionSuccess callback', data);
    },
    onError: (error) => {
      console.log('onError callback', error)
    },
    onModalClose: () => {},
  },
  customer: {
    name: 'Dan Abramov',
    documentNumber: '19981596639',
    email: 'mercurio@pagar.me',
    phoneNumber: '1130442277',
  },
  billing: {
    street: 'Rua Fidêncio Ramos',
    number: '308',
    additionalInfo: 'Pagar.me',
    neighborhood: 'Vila Olimpia',
    city: 'São Paulo',
    state: 'SP',
    zipcode: '04551010',
  },
  shipping: {
    street: 'Rua Fidêncio Ramos',
    number: '308',
    additionalInfo: 'Pagar.me',
    neighborhood: 'Vila Olimpia',
    city: 'São Paulo',
    state: 'SP',
    zipcode: '04551010',
    fee: 1599,
  },
  cart: {
    items: [
      {
        id: 1,
        title: 'Red pill',
        unitPrice: 5000,
        quantity: 1,
        tangible: true,
      },
      {
        id: 2,
        title: 'Blue pill',
        unitPrice: 5000,
        quantity: 1,
        tangible: true,
      },
      {
        id: 3,
        title: 'Orange pill',
        unitPrice: 6000,
        quantity: 2,
        tangible: true,
      },
      {
        id: 4,
        title: 'Green pill',
        unitPrice: 1000,
        quantity: 10,
        tangible: true,
      },
      {
        id: 6,
        title: 'White pill',
        unitPrice: 6000,
        quantity: 2,
        tangible: true,
      },
      {
        id: 7,
        title: 'Black pill',
        unitPrice: 1000,
        quantity: 10,
        tangible: true,
      },
    ],
  },
  transaction: {
    amount: 10000,
    paymentMethods: [
      ['creditcard', 'creditcard'],
      ['creditcard', 'boleto'],
    ],
    defaultMethod: 'creditcard',
    paymentConfig: {
      boleto: {
        subtitle: '10% de desconto :)',
        softDescriptor: 'Company name',
        instructions: 'Use this field to add instructions',
        expirationAt: '2018-11-30',
        discount: {
          type: 'percentage',
          value: 25,
        },
      },
      creditcard: {
        subtitle: 'Em até 3x sem juros!',
        invoiceDescriptor: 'Mercurio :)',
        installments: [
          {
            initial: 2,
            max: 10,
            free: 3,
            interestRate: [
              {
                installment: 3,
                type: 'percentage',
                value: 10,
              },
              {
                installment: 6,
                type: 'amount',
                value: 12000,
              },
            ]
          },
          {
            initial: 3,
            max: 6,
            free: 1,
            interestRate: [
              {
                installment: 3,
                type: 'percentage',
                value: 10,
              },
              {
                installment: 6,
                type: 'amount',
                value: 12000,
              },
            ]
          },
        ]
      },
    },
  }
};`

const mundipaggApi = `var configs = {
  token: 'SOME_TOKEN_HERE',
};`

const storagedCustomCode = window.localStorage.getItem('custom')
if (storagedCustomCode) {
  customPanel.setValue(storagedCustomCode)
  customPanel.clearSelection()
} else {
  customPanel.setValue(pagarmeApi)
  customPanel.clearSelection()
}

const optSetMundipagg = document.querySelector('#opt-set-mundipagg');
optSetMundipagg.addEventListener('click', () => {
  fullPanel.setValue(mundipaggApi);
  fullPanel.clearSelection()
})

const optSetPagarme = document.querySelector('#opt-set-pagarme')
optSetPagarme.addEventListener('click', () => {
  fullPanel.setValue(pagarmeApi);
  fullPanel.clearSelection()
})

optSetPagarme.click()