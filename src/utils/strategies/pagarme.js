import {
  always,
  applySpec,
  cond,
  defaultTo,
  equals,
  identity,
  of,
  path,
  pipe,
  prop,
  replace,
  T,
} from 'ramda'

import errorHandle from './requestErrorHandle'

const url = 'https://api.pagar.me/1/transactions'

const parseToPayload = applySpec({
  encryption_key: prop('publickey'),
  amount: prop('amount'),
  card_number: path(['payment', 'info', 'cardNumber']),
  card_cvv: path(['payment', 'info', 'cvv']),
  card_expiration_date: pipe(
    path(['payment', 'info', 'expiration']),
    replace(/\//g, ''),
  ),
  soft_descriptor: path(['payment', 'method', 'statementDescriptor']),
  card_holder_name: path(['payment', 'info', 'holderName']),
  payment_method: pipe(
    path(['payment', 'method', 'type']),
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
})

const strategy = (data) => {
  const payload = parseToPayload(data)

  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
    .then(errorHandle)
    .then(response => response.json())
}

export default strategy

