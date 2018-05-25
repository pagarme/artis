import {
  applySpec,
  always,
  cond,
  equals,
  head,
  identity,
  ifElse,
  join,
  length,
  map,
  of,
  pipe,
  path,
  pathOr,
  prop,
  propOr,
  replace,
  split,
  values,
  dissoc,
  dissocPath,
  T,
} from 'ramda'

import { formatInstallments } from '../masks/'
import { generateInstallments } from './../calculations'
import URLS from './urls'

const dotsRegex = /\./g
const spacesRegex = / /g

const removePathIfNull = dataPath => ifElse(
  path(dataPath),
  identity,
  dissocPath(dataPath)
)

const removePropIfNull = propName => ifElse(
  prop(propName),
  identity,
  dissoc(propName)
)

const addressParse = applySpec({
  street: path(['address', 'street']),
  number: path(['address', 'number']),
  additionalInfo: path(['address', 'complement']),
  neighborhood: path(['address', 'neighborhood']),
  city: path(['address', 'city']),
  state: path(['address', 'state']),
  zipcode: path(['address', 'zip_code']),
})

const parseBoletoTokenData = pipe(
  ifElse(
    prop('boleto'),
    applySpec({
      expirationAt: prop('due_at'),
      instructions: prop('instructions'),
    }),
    always(null),
  )
)

const parseCreditcardTokenData = ifElse(
  prop('credit_card'),
  pipe(
    prop('credit_card'),
    applySpec({
      invoiceDescriptor: prop('statement_descriptor'),
      installments: pipe(
        applySpec({
          initial: always(1),
          max: pipe(
            prop('installments'),
            length
          ),
          interestRate: pipe(
            prop('installments'),
            map(
              applySpec({
                installment: prop('number'),
                type: always('amount'),
                value: prop('total'),
              })
            )
          ),
        }),
        of
      ),
    })
  ),
  always(null)
)

const parseTokenData = pipe(
  applySpec({
    key: path(['account', 'public_key']),
    token: prop('id'),
    configs: applySpec({
      companyName: path(['account', 'name']),
    }),
    customer: applySpec({
      id: path(['customer', 'id']),
      name: path(['customer', 'name']),
      documentNumber: path(['customer', 'document']),
      email: path(['customer', 'email']),
      phoneNumber: pipe(
        pathOr({}, ['customer', 'phones', 'home_phone']),
        values,
        join(' ')
      ),
    }),
    billing: pipe(
      prop('billing'),
      addressParse
    ),
    shipping: pipe(
      prop('shipping'),
      addressParse,
      applySpec({
        fee: path(['shipping', 'amount']),
      }),
    ),
    cart: applySpec({
      items: pipe(
        prop('items'),
        map(
          applySpec({
            title: prop('description'),
            unitPrice: prop('amount'),
            quantity: prop('quantity'),
          })
        )
      ),
    }),
    transaction: applySpec({
      amount: prop('amount'),
      defaultMethod: path(['default_payment_method']),
      paymentConfig: pipe(
        prop('payment_settings'),
        applySpec({
          boleto: parseBoletoTokenData,
          creditcard: parseCreditcardTokenData,
        })
      ),
    }),
  }),
  removePathIfNull(['transaction', 'paymentConfig', 'creditcard']),
  removePathIfNull(['transaction', 'paymentConfig', 'boleto']),
  removePathIfNull(['transaction', 'defaultMethod']),
)

const getLineAddress = ({
  number,
  street,
  neighborhood,
}) => `${number}, ${street}, ${neighborhood}`

const getPaymentType = path([
  'payment',
  'type',
])

const getCreditCardExpiration = path([
  'payment',
  'info',
  'expiration',
])

const getExpirationMonth = expiration => expiration[0]
const getExpirationYear = expiration => expiration[1]

const parsersPaymentData = {
  creditcard: applySpec({
    amount_percentage: always(100),
    payment_method: always('credit_card'),
    credit_card: applySpec({
      installments: pathOr(1, ['payment', 'info', 'installments']),
      card: {
        brand: always('visa'), // to do fix brand
        exp_month: pipe(
          getCreditCardExpiration,
          split('/'),
          getExpirationMonth,
        ),
        exp_year: pipe(
          getCreditCardExpiration,
          split('/'),
          getExpirationYear,
        ),
        holder_name: path(['payment', 'info', 'holderName']),
        number: pipe(
          path(['payment', 'info', 'cardNumber']),
          replace(spacesRegex, '')
        ),
        security_code: path(['payment', 'info', 'cvv']),
      },
    }),
  }),
  boleto: applySpec({
    payment_method: always('boleto'),
    amount_percentage: always(100),
  }),
}

const getAddress = applySpec({
  city: prop('city'),
  state: prop('state'),
  country: propOr('BR', 'country'),
  zip_code: prop('zipcode'),
  line_1: getLineAddress,
  line_2: prop('complement'),
  description: propOr('Endereço 1', 'description'),
})

const getBilling = pipe(
  prop('billing'),
  dissoc('description'),
  getAddress
)

const getShipping = pipe(
  prop('shipping'),
  getAddress,
  address => ({
    address: dissoc('description', address),
    description: prop('description', address),
  }),
)

const mergePaymentInfos = (data) => {
  const paymentType = getPaymentType(data)

  return parsersPaymentData[paymentType](data)
}

const sameAddressOfBilling = pipe(
  path([
    'billing',
    'sameAddressForShipping',
  ]),
  equals('true')
)

const getTransactionData = pipe(
  applySpec({
    token_id: prop('token'),
    billing_equal_to_shipping: sameAddressOfBilling,
    payments: pipe(
      mergePaymentInfos,
      of
    ),
    payment_method: pipe(
      getPaymentType,
      cond([
        [equals('creditcard'), always('credit_card')],
        [T, identity],
      ])
    ),
    customer: applySpec({
      id: path(['customer', 'id']),
      email: path(['customer', 'email']),
      name: path(['customer', 'name']),
    }),
    billing_address: getBilling,
    shipping: ifElse(
      sameAddressOfBilling,
      getShipping,
      always(null)
    ),
  }),
  ifElse(
    prop('shipping'),
    identity,
    dissoc('shipping')
  )
)

const getTokenData = (token) => {
  const url = `${URLS.mundipagg.token}/${token}`

  const configs = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }

  return fetch(url, configs)
    .then(res => res.json())
    .then(parseTokenData)
}

const getBoletoBarcode = pipe(
  prop('payments'),
  head,
  path(['boleto', 'line']),
  replace(dotsRegex, '')
)

const getBoletoUrl = pipe(
  prop('payments'),
  head,
  path(['boleto', 'pdf']),
)

const isAuthorized = (status, barcode) => (status === 'paid')
  || (status === 'pending' && barcode)

const parseStatus = (data) => {
  const { status, boleto_barcode: boletoBarcode } = data

  if (isAuthorized(status, boletoBarcode)) {
    return {
      ...data,
      status: 'authorized',
    }
  }

  return { ...data, status }
}

const parseResponse = pipe(
  applySpec({
    boleto_url: getBoletoUrl,
    boleto_barcode: getBoletoBarcode,
    status: prop('status'),
  }),
  removePropIfNull('boleto_barcode'),
  removePropIfNull('boleto_url'),
  parseStatus,
)

const getInstallments = (amount, installment) => {
  const installments = formatInstallments(
    generateInstallments(amount, installment)
  )

  return Promise.resolve(installments)
}

const request = (data) => {
  const payload = getTransactionData(data)
  const url = `${URLS.mundipagg.payment}?appId=${data.key}`

  const configs = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(payload),
  }

  return fetch(url, configs)
    .then(response => response.json())
    .then(parseResponse)
}

const prepare = (apiData) => {
  const { token, amount, transaction } = apiData

  const installments = pathOr({}, [
    'paymentConfig',
    'creditcard',
    'installments',
  ], transaction)

  return Promise.all([
    getTokenData(token),
    getInstallments(amount, installments),
  ])
}

export default {
  prepare,
  request,
}
