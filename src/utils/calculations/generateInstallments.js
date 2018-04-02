import {
  filter,
  gte,
  last,
  pipe,
  prop,
} from 'ramda'

import formatToBRL from '../helpers/formatToBRL'

const generateArray = length => Array.from(
  { length }
).map(Number.call, Number)

const isFree = (free, value) => value > free

const getInstallmentAmount = (amount, installments) => (amount / installments).toFixed(0)

const getInterestPercentage = (amount, interest) => (amount * (interest / 100))

const getInterestAmount = (amount, interest) => interest // eslint-disable-line

const interestCalculateFunctions = {
  percentage: getInterestPercentage,
  amount: getInterestAmount,
}

const getInterestOption = index => pipe(
  filter(
    pipe(
      prop('installment'),
      gte(index)
    )
  ),
  last
)


const generateFreeInstallment = (index, amount) => {
  const installmentAmount = getInstallmentAmount(amount, index)
  const parsedAmount = formatToBRL(installmentAmount)

  return {
    amount,
    installmentAmount,
    value: index.toString(),
    name: `${index}x de ${parsedAmount} sem juros.`,
  }
}

const getInterestInstallment = (interestRate, index, amount) => {
  const interest = getInterestOption(index)(interestRate)

  if (!interest) {
    return generateFreeInstallment(index, amount)
  }

  const calculateFunction = interestCalculateFunctions[interest.type]

  const interestValue = calculateFunction(amount, interest.value)
  const newAmount = amount + interestValue
  const installmentAmount = getInstallmentAmount(newAmount, index)
  const parsedAmount = formatToBRL(installmentAmount)

  return {
    installmentAmount,
    interest: interestValue,
    value: index.toString(),
    name: `${index}x de ${parsedAmount} com juros.`,
    amount: newAmount,
  }
}

const calculateInstallmentAmount = (
  interestRate,
  free,
  amount,
) => (value) => {
  const index = value + 1

  if (isFree(free, index)) {
    return getInterestInstallment(interestRate, index, amount)
  }

  return generateFreeInstallment(index, amount)
}

const calculate = (amount, installmentConfig) => {
  const {
    max,
    free,
    interestRate,
  } = installmentConfig

  if (!max) {
    return []
  }

  const installments = generateArray(max)
  const generateInstallments = calculateInstallmentAmount(
    interestRate,
    free,
    amount
  )

  return installments.map(generateInstallments)
}

export default calculate
