import {
  always,
  applySpec,
  cond,
  defaultTo,
  equals,
  identity,
  merge,
  of,
  path,
  pipe,
  prop,
  replace,
  T,
} from 'ramda'

import errorHandle from './requestErrorHandle'

const url = 'https://api.pagar.me/1/transactions'

const getPaymentMethodType = path(['payment', 'method', 'type'])

const parseCreditcardData = applySpec({
  card_number: path(['payment', 'info', 'cardNumber']),
  card_cvv: path(['payment', 'info', 'cvv']),
  card_expiration_date: pipe(
    path(['payment', 'info', 'expiration']),
    replace(/\//g, ''),
  ),
  soft_descriptor: path(['payment', 'method', 'statementDescriptor']),
  card_holder_name: path(['payment', 'info', 'holderName']),
})

const parseBoletoData = applySpec({
  boleto_expiration_date: path(['payment', 'method', 'instructions']),
  boleto_instructions: path(['payment', 'method', 'expirationAt']),
})

const parseToPayload = applySpec({
  encryption_key: prop('publickey'),
  amount: prop('amount'),
  payment_method: pipe(
    getPaymentMethodType,
    cond([
      [equals('creditcard'), always('credit_card')],
      [T, identity],
    ])
  ),
  customer: pipe(
    prop('customer'),
    applySpec({
      external_id: prop('externalId'),
      name: prop('name'),
      type: pipe(
        prop('type'),
        defaultTo('individual'),
      ),
      country: always('br'),
      email: prop('email'),
      document_number: prop('documentNumber'),
      documents: pipe(
        applySpec({
          type: always('cpf'),
          number: prop('documentNumber'),
        }),
        of,
      ),
      phone_numbers: pipe(
        prop('phoneNumber'),
        of,
      ),
    }),
  ),
  billing: applySpec({
    address: applySpec({
      state: path(['billing', 'state']),
      city: path(['billing', 'city']),
      neighborhood: path(['billing', 'neighborhood']),
      street: path(['billing', 'street']),
      street_number: path(['billing', 'number']),
      zipcode: path(['billing', 'zipcode']),
    }),
  }),
  split_rules: path(['transaction', 'splitRules']),
})

const getPaymentMethodData = (data) => {
  switch (getPaymentMethodType(data)) {
    case 'boleto':
      return parseBoletoData(data)
    case 'creditcard':
      return parseCreditcardData(data)
    default:
      throw new Error('Payment method not supported.')
  }
}

const strategy = (data) => {
  const payload = parseToPayload(data)
  const paymentData = getPaymentMethodData(data)
  const fullPayload = merge(paymentData, payload)

  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(fullPayload),
  })
    .then(errorHandle)
    .then(response => response.json())
}

export default strategy

