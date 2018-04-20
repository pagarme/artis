import {
  filter,
  gte,
  last,
  pipe,
  prop,
} from 'ramda'

const generateArray = length => Array.from(
  { length }
).map(Number.call, Number)

const isFree = (free, value) => value > free

const getInstallmentAmount = (amount, installments) =>
  (amount / installments).toFixed(0)

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

  return {
    amount,
    installmentAmount,
    value: index.toString(),
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

  return {
    installmentAmount,
    interest: interestValue,
    value: index.toString(),
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

const calculate = (amount, installmentConfig = {}) => {
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
