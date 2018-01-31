import {
  gte,
  filter,
  map,
  pipe,
} from 'ramda'

import formatToBRL from './formatToBRL'

const filterInstallment = range => ({ value }) => gte(range, value)

const isFree = (freeInstallments, value) => value > freeInstallments

const getInstallmentAmount = (amount, installments) => (amount / installments).toFixed(0)

const getInterest = (amount, interest) => (amount * (interest / 100))

const calculateInstallmentAmount = (
  interestRate,
  freeInstallments,
  amount,
) => (installment) => {
  const { name, value } = installment

  if (isFree(freeInstallments, value)) {
    const interest = getInterest(amount, interestRate)
    const newAmount = amount + interest
    const installmentAmount = getInstallmentAmount(newAmount, value)
    const parsedAmount = formatToBRL(installmentAmount)

    return {
      value,
      interest,
      installmentAmount,
      name: `${name} de ${parsedAmount} com juros.`,
      amount: newAmount,
    }
  }

  const installmentAmount = getInstallmentAmount(amount, value)
  const parsedAmount = formatToBRL(installmentAmount)

  return {
    value,
    amount,
    installmentAmount,
    name: `${name} de ${parsedAmount} sem juros.`,
  }
}

const calculate = (creditcard, installments, amount) => {
  const {
    maxInstallments,
    interestRate,
    freeInstallments,
  } = creditcard

  if (!maxInstallments) {
    return []
  }

  return pipe(
    filter(filterInstallment(maxInstallments)),
    map(calculateInstallmentAmount(interestRate, freeInstallments, amount)),
  )(installments)
}

export {
  filterInstallment,
  calculateInstallmentAmount,
}

export default calculate
