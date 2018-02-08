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

const parseBoletoSettings = applySpec(
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

const parseCreditcardSettings = applySpec(
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

const parsePaymentSettings = cond([
  [pathEq(['payment', 'method', 'type'], 'boleto'), parseBoletoSettings],
  [T, parseCreditcardSettings],
])

const parseTokenData = applySpec(
  {
    type: always('order'),
    currency: propOr('BRL', 'currency'),
    success_url: prop('postback'),
    order: {
      items: prop('items'),
    },
    payment_settings: parsePaymentSettings,
  }
)

const parseHeaders = key => ({
  auth: {
    username: key,
  },
})

const parsePaymentData = () => {}

export {
  parseHeaders,
  parseTokenData,
  parsePaymentData,
  toIsoDate,
}
