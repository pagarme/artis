import {
  toIsoDate,
  getTokenData,
} from './request'

const rawDataBoleto = {
  amount: 5000,
  postback: 'http://www.meusite.com.br',
  customer: {
    name: 'Dan Abramov',
    documentNumber: 44455522299,
    email: 'mercurio@pagar.me',
    phoneNumber: 1130442277,
  },
  billing: {
    street: 'Rua Fidêncio Ramos',
    number: 308,
    complement: 'Pagar.me',
    neighborhood: 'Vila Olimpia',
    city: 'São Paulo',
    state: 'SP',
    zipcode: '04551010',
  },
  shipping: {
    street: 'Rua Fidêncio Ramos',
    number: 308,
    complement: 'Pagar.me',
    neighborhood: 'Vila Olimpia',
    city: 'São Paulo',
    state: 'SP',
    zipcode: '04551010',
  },
  payment: {
    method: {
      type: 'boleto',
      title: 'Boleto',
      subtitle: '25% de Desconto!',
      instructions: 'Aceitar pagamento somente ate o vencimento',
      discount: {
        type: 'percentage',
        value: 25,
      },
      expirationAt: '2018-03-30',
    },
  },
  key: 'some_key',
  items: [
    {
      description: 'Cerveja Trooper 330ml',
      amount: 5000,
      quantity: 2,
      tangible: true,
    },
  ],
}

const rawDataCreditCard = {
  amount: 5000,
  postback: 'http://www.meusite.com.br',
  customer: {
    name: 'Dan Abramov',
    documentNumber: 44455522299,
    email: 'mercurio@pagar.me',
    phoneNumber: 1130442277,
  },
  billing: {
    street: 'Rua Fidêncio Ramos',
    number: 308,
    complement: 'Pagar.me',
    neighborhood: 'Vila Olimpia',
    city: 'São Paulo',
    state: 'SP',
    zipcode: '04551010',
  },
  shipping: {
    street: 'Rua Fidêncio Ramos',
    number: 308,
    complement: 'Pagar.me',
    neighborhood: 'Vila Olimpia',
    city: 'São Paulo',
    state: 'SP',
    zipcode: '04551010',
  },
  payment: {
    method: {
      type: 'creditcard',
      title: 'Creditcard',
      subtitle: '25% de Desconto!',
      statementDescriptor: 'Descrição na fatura do cartão',
    },
  },
  key: 'some_key',
  items: [
    {
      description: 'Cerveja Trooper 330ml',
      amount: 5000,
      quantity: 2,
      tangible: true,
    },
  ],
}

describe('Requester', () => {
  it('should convert date to iso string', () => {
    const date = '2018-10-21'

    const isoDate = toIsoDate(date)

    expect(isoDate).toBe('2018-10-21T00:00:00.000Z')
  })

  it('should generate transaction token for boleto', () => {
    const expected = {
      type: 'order',
      currency: 'BRL',
      success_url: 'http://www.meusite.com.br',
      order: {
        items: [
          {
            amount: 5000,
            description: 'Cerveja Trooper 330ml',
            quantity: 2,
            tangible: true,
          },
        ],
      },
      payment_settings: {
        accepted_payment_methods: ['boleto'],
        boleto: {
          due_at: '2018-03-30T00:00:00.000Z',
          instructions: 'Aceitar pagamento somente ate o vencimento',
        },
      },
    }

    const data = getTokenData(rawDataBoleto)

    expect(data).toEqual(expected)
  })

  it('should generate transaction token for creditcard', () => {
    const expected = {
      type: 'order',
      currency: 'BRL',
      success_url: 'http://www.meusite.com.br',
      order: {
        items: [
          {
            amount: 5000,
            description: 'Cerveja Trooper 330ml',
            quantity: 2,
            tangible: true,
          },
        ],
      },
      payment_settings: {
        accepted_payment_methods: ['credit_card'],
        credit_card: {
          statement_descriptor: 'Descrição na fatura do cartão',
        },
      },
    }

    const data = getTokenData(rawDataCreditCard)

    expect(expected).toEqual(data)
  })
})
