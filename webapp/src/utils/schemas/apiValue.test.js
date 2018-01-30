import Joi from 'joi-browser'
import { merge } from 'ramda'
import schema from './apiValues'

const key = 'SOME_KEY'

const configs = {
  image: './path/image.png',
  target: '#checkout',
  primaryColor: '323232',
  secondaryColor: '323232',
}

const params = {
  amount: 5000,
  softDescriptor: 'Pagar.me',
  paymentMethods: [
    'boleto',
    'creditcard',
  ],
  postbackUrl: 'http://pagar.me',
  boleto: {
    instructions: 'Use this field to add instructions on boleto',
    discount: {
      type: 'percentage',
      value: 15,
    },
    expirationAt: '2099-01-30',
  },
  creditcard: {
    brands: [
      'elo',
      'amex',
      'diners',
      'jcb',
      'visa',
      'mastercard',
    ],
    maxInstallments: 12,
    freeInstallments: 3,
    defaultInstallments: 1,
    interestRate: 25,
  },
  customer: {
    name: 'Dan Abramov',
    documentNumber: '44455522299',
    email: 'mercurio@pagar.me',
    phoneNumber: '1130442277',
  },
  billing: {
    street: 'Rua Fidêncio Ramos',
    number: '308',
    complement: 'Pagar.me',
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
  ],
}

describe('Schema API', () => {
  it('should validate API values', () => {
    const { error } = Joi.validate({ key, configs, params }, schema)
    expect(error).toBeNull()
  })

  it('should validate expirationAt greater then now from boleto', () => {
    const data = merge({ key, configs, params }, {
      params: {
        amount: 100,
        boleto: {
          expirationAt: '2018-01-01',
        },
      },
    })

    const { error } = Joi.validate(data, schema)
    const [details] = error.details

    expect(details.type).toBe('date.min')
    expect(details.path).toHaveLength(3)
    expect(details.path).toEqual(['params', 'boleto', 'expirationAt'])
  })

  it('should validate min amount', () => {
    const data = merge({ key, configs, params }, {
      params: {
        amount: 0,
      },
    })

    const { error } = Joi.validate(data, schema)
    const [details] = error.details

    expect(details.type).toBe('number.min')
    expect(details.path).toHaveLength(2)
    expect(details.path).toEqual(['params', 'amount'])
  })

  it('should validate max installments', () => {
    const data = merge({ key, configs, params }, {
      params: {
        amount: 1,
        creditcard: {
          maxInstallments: 13,
        },
      },
    })

    const { error } = Joi.validate(data, schema)
    const [details] = error.details

    expect(details.type).toBe('number.max')
    expect(details.path).toHaveLength(3)
    expect(details.path).toEqual(['params', 'creditcard', 'maxInstallments'])
  })


  it('should validate items', () => {
    const data = merge({ key, configs, params }, {
      params: {
        amount: 1,
      },
    })

    const { error } = Joi.validate(data, schema)
    const [details] = error.details

    expect(details.type).toBe('any.required')
    expect(details.path).toHaveLength(2)
    expect(details.path).toEqual(['params', 'items'])
  })
})
