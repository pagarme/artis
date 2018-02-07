import {
  applySpec,
  propOr,
  prop,
  path,
  pathOr,
  always,
  pipe,
  of,
  pathEq,
  cond,
  T,
} from 'ramda'

const toIsoDate = data => new Date(data).toISOString()

const getFormatedExpirationAt = pipe(
  path(['payment', 'method', 'expirationAt']),
  toIsoDate
)

const getBoletoSettings = applySpec(
  {
    accepted_payment_methods: pipe(
      always('boleto'),
      of
    ),
    boleto: {
      due_at: getFormatedExpirationAt,
      instructions: pathOr('', ['payment', 'method', 'instructions']),
    },
  }
)

const getCreditcardSettings = applySpec(
  {
    accepted_payment_methods: pipe(
      always('credit_card'),
      of
    ),
    credit_card: {
      statement_descriptor: path(['payment', 'method', 'statementDescriptor']),
    },
  }
)

const getPaymentSettings = cond([
  [pathEq(['payment', 'method', 'type'], 'boleto'), getBoletoSettings],
  [T, getCreditcardSettings],
])

const getTokenData = applySpec(
  {
    type: always('order'),
    currency: propOr('BRL', 'currency'),
    success_url: prop('postback'),
    order: {
      items: prop('items'),
    },
    payment_settings: getPaymentSettings,
  }
)

const getHeaders = key => ({
  auth: {
    username: key,
  },
})

const getPaymentData = () => {}

export {
  getHeaders,
  getTokenData,
  getPaymentData,
  toIsoDate,
}
