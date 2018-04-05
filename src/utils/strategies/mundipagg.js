import {
  applySpec,
  always,
  join,
  length,
  map,
  of,
  pipe,
  path,
  pathOr,
  prop,
  values,
} from 'ramda'

const addressParse = applySpec({
  street: path(['address', 'street']),
  number: path(['address', 'number']),
  additionalInfo: path(['address', 'complement']),
  neighborhood: path(['address', 'neighborhood']),
  city: path(['address', 'city']),
  state: path(['address', 'state']),
  zipcode: path(['address', 'zip_code']),
})

const parseTokenData = applySpec({
  key: path(['account', 'public_key']),
  configs: applySpec({
    companyName: path(['account', 'name']),
    freightValue: path(['shipping', 'amount']),
  }),
  formData: applySpec({
    customer: applySpec({
      name: path(['customer', 'name']),
      documentNumber: path(['customer', 'document']),
      email: path(['customer', 'email']),
      phoneNumber: pipe(
        pathOr({}, ['customer', 'phones', 'home_phone']),
        values,
        join('')
      ),
    }),
    billing: pipe(
      prop('billing'),
      addressParse
    ),
    shipping: pipe(
      prop('shipping'),
      addressParse
    ),
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
    defaultMethod: pathOr('creditcard', ['default_payment_method']),
    paymentMethods: pipe(
      prop('payment_settings'),
      applySpec({
        boleto: pipe(
          prop('boleto'),
          applySpec({
            expirationAt: prop('due_at'),
            instructions: prop('instructions'),
          })
        ),
        creditcard: pipe(
          prop('credit_card'),
          applySpec({
            statementDescriptor: prop('statement_descriptor'),
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
      })
    ),
  }),
})

const getTokenData = token => fetch(
  `https://api.mundipagg.com/checkout/v1/tokens/${token}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
  .then(res => res.json())
  .then(parseTokenData)

export default { getTokenData }
