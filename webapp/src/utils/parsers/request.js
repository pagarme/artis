import { generateInstallments } from '../calculations'

const getInstallments = (creditcard, amount, selectedInstallment) => {
  const installments = generateInstallments(creditcard, amount)

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

const boletoData = payment => ({
  accepted_payment_methods: ['boleto'],
  boleto: {
    instructions: payment.method.instructions || '',
    due_at: new Date(payment.method.expirationAt).toISOString(),
  },
})

const creditcardData = ({ method, info }, amount) => ({
  accepted_payment_methods: ['credit_card'],
  credit_card: {
    statement_descriptor: method.statementDescriptor || '',
    ...getInstallments(method, amount, info.installments),
  },
})

const paymentSettings = (payment, amount) => (
  payment.method.type === 'boleto'
    ? boletoData(payment)
    : creditcardData(payment, amount))

const tokenData = ({ amount, payment, items, postback }) => ({
  type: 'order',
  currency: 'BRL',
  success_url: postback,
  order: {
    items,
  },
  payment_settings: paymentSettings(payment, amount),
})

const headers = key => ({
  auth: {
    username: key,
  },
})

export {
  headers,
  tokenData,
}
