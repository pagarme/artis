import { generateInstallmnets } from '../calculations'

const defaultToken = {
  type: 'order',
  currency: 'BRL',
}

const convertData = data => new Date(data).toISOString()

const getInstallments = (creditcard, amount, selectedInstallment) => {
  const installments = generateInstallmnets(creditcard, amount)

  if (installments.length) {
    const installmentsObj = installments[selectedInstallment - 1]

    return {
      installments: [
        {
          number: installmentsObj.value,
          total: installmentsObj.amount,
        },
      ],
    }
  }

  return {}
}

const getBoletoData = payment => ({
  accepted_payment_methods: ['boleto'],
  boleto: {
    instructions: payment.method.instructions || '',
    due_at: convertData(payment.method.expirationAt),
  },
})

const getCreditcardData = ({ method, info }, amount) => ({
  accepted_payment_methods: ['credit_card'],
  credit_card: {
    statement_descriptor: method.statementDescriptor || '',
    ...getInstallments(method, amount, info.installments),
  },
})

const getSpecificData = (payment, amount) => (
  payment.method.type === 'boleto' ?
    getBoletoData(payment) :
    getCreditcardData(payment, amount)
)

const getTokenData = (payment, { postback, items, amount }) => ({
  ...defaultToken,
  success_url: postback,
  order: {
    items,
  },
  payment_settings: getSpecificData(payment, amount),
})

const getHeaders = key => ({
  auth: {
    username: key,
  },
})

export {
  getHeaders,
  getTokenData,
}
