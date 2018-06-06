import { pathOr } from 'ramda'

const apiValidation = apiData => () => {
  const key = pathOr(null, ['key'], apiData)
  const amount = pathOr(null, ['transaction', 'amount'], apiData)

  const errors = []

  const errorMessages = {
    key: 'The "key" parameter is required',
    amount: 'The "amount" parameter is required',
    amountType: 'The "amount" parameter should be Number',
  }

  if (!key) errors.push(errorMessages.key)
  if (!amount) errors.push(errorMessages.amount)
  if (typeof amount !== 'number') errors.push(errorMessages.amountType)

  return errors
}

export default apiValidation
