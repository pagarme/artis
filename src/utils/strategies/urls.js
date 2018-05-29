const mundipagg = 'https://api.mundipagg.com/checkout/v1/'
const pagarme = 'https://api.pagar.me/1/'

export default {
  mundipagg: {
    payment: `${mundipagg}${'payments'}`,
    token: `${mundipagg}${'tokens'}`,
  },
  pagarme: {
    transaction: `${pagarme}${'transactions'}`,
    installments: `${pagarme}${'transactions/calculate_installments_amount'}`,
  },
}
