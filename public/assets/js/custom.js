/* eslint-disable */
const pagarmeApi = `var configs = {
  key: 'ek_test_sjQXl3mVUFu1QQYpiSvUBaybtXtXjz',
  configs: {
    companyName: 'Pagar.me',
    image: './pagarme.png',
    themeBase: 'dark',
    primaryColor: '#7ad499',
    secondaryColor: '#46b67c',
    postback: 'http://pagar.me',
    enableCart: true,
    onSuccess: (data) => {
      console.log('Success call', JSON.stringify(data, null, 2))
    },
    onError: (error) => {
      console.log('Error call', JSON.stringify(error, null, 2))
    },
    freightValue: 1599,
    onClose: () => {},
  },
  formData: {
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
    },
    items: [
      {
        id: 1,
        title: 'Red pill',
        unitPrice: 5000,
        quantity: 1,
        tangible: true,
      },
      {
        id: 1,
        title: 'Blue pill',
        unitPrice: 5000,
        quantity: 1,
        tangible: true,
      },
    ],
  },
  transaction: {
    amount: 10000,
    multipayment: [
      ['creditcard', 'creditcard'],
      ['creditcard', 'boleto'],
    ],
    defaultMethod: 'creditcard',
    paymentMethods: {
      boleto: {
        subtitle: '25% de Desconto!',
        instructions: 'Use this field to add instructions',
        expirationAt: '2018-11-30',
        fileName: 'boleto_pagarme.pdf',
        discount: {
          type: 'percentage',
          value: 25,
        },
      },
      creditcard: {
        subtitle: '25% de Desconto!',
        statementDescriptor: 'Mercurio :)',
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
    }
  }
};`

const mundiApi = `var configs = {
  token: 'chk_1AYmoD4Ip3CBQgRZ', // boleto
  // token: 'chk_JwO07OlTMFLYW9e3', // creditcard
  onSuccess: (data) => {
    console.log('Success call', JSON.stringify(data, null, 2))
  },
  onError: (error) => {
    console.log('Error call', JSON.stringify(error, null, 2))
  },
};`

/** Custom Panel **/
const custom = ace.edit('custom');
custom.setTheme('ace/theme/monokai');
custom.session.setMode('ace/mode/javascript');
custom.getSession().setTabSize(2);
custom.setOptions({ fontSize: '11pt' });

const storagedCustomCode = window.localStorage.getItem('custom')
if (storagedCustomCode) {
  custom.setValue(storagedCustomCode)
  custom.clearSelection()
}

/** Full Panel **/
const full = ace.edit('full');
full.setTheme('ace/theme/monokai');
full.session.setMode('ace/mode/javascript');
full.getSession().setTabSize(2);
full.setOptions({ fontSize: '11pt' });
full.setValue(pagarmeApi);

const btnSetMundi = document.querySelector('#btn-set-mundi');
btnSetMundi.addEventListener('click', () => {
  full.setValue(mundiApi);
})

const btnSetPagarme = document.querySelector('#btn-set-pagarme')
btnSetPagarme.addEventListener('click', () => {
  full.setValue(pagarmeApi);
})

const btnOpenCustom = document.querySelector('#btn-open-custom')
btnOpenCustom.addEventListener('click', () => {
  const code = custom.session.getDocument().getAllLines().join('\n')
  window.localStorage.setItem('custom', code)
  eval(code)
  Checkout(configs)()
})

const btnResetCustom = document.querySelector('#btn-reset-custom')
btnResetCustom.addEventListener('click', () => {
  window.localStorage.setItem('custom', '')
  location.reload()
})


const btnOpenFull = document.querySelector('#btn-open-full')
btnOpenFull.addEventListener('click', () => {
  const code = full.session.getDocument().getAllLines().join('\n')
  eval(code)
  Checkout(configs)()
})