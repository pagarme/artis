import { pathOr } from 'ramda'
import dayjs from 'dayjs'

const verifyBoletoExpiration = (dateFromApi) => {
  const expirationAt = dayjs(dateFromApi)
  const actualDate = dayjs()

  return expirationAt.diff(actualDate) > 0
}

const apiValidation = apiData => () => {
  const key = pathOr(null, ['key'], apiData)
  const amount = pathOr(null, ['transaction', 'amount'], apiData)
  const cartItems = pathOr(null, ['cart', 'items'], apiData)
  const boletoExpirationAt = pathOr(null, [
    'transaction',
    'paymentConfig',
    'boleto',
    'expirationAt',
  ], apiData)

  const errors = []

  const errorMessages = {
    key: 'The "key" parameter is required',
    amount: 'The "amount" parameter is required',
    amountType: 'The "amount" parameter should be Number',
    expirationAt: 'The boleto expiration_at is outdated',
  }

  if (boletoExpirationAt && !verifyBoletoExpiration(boletoExpirationAt)) {
    errors.push(errorMessages.expirationAt)
  }
  if (!key) errors.push(errorMessages.key)
  if (!amount && !cartItems) errors.push(errorMessages.amount)
  if (amount && typeof parseInt(amount) !== 'number') { //eslint-disable-line
    errors.push(errorMessages.amountType)
  }

  return errors
}

export default apiValidation
