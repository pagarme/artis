import {
  defaultTo,
  filter,
  gte,
  identity,
  last,
  of,
  path,
  pipe,
  prop,
} from 'ramda'

const generateArray = length => Array.from(
  { length }
).map(Number.call, Number)

const isFree = (free, value) => value <= free

const getInstallmentAmount = (amount, installments) =>
  (amount / installments).toFixed(0)

const getInterestPercentage = (interest, amount) => (amount * (interest / 100))

const interestCalculateFunctions = {
  percentage: getInterestPercentage,
  amount: identity,
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

const getInterestInstallment = (interestRate, index, amount) => {
  const interest = getInterestOption(index)(interestRate)

  const calculateFunction = pipe(
    path(of(prop('type', interest))),
    defaultTo(identity)
  )(interestCalculateFunctions)

  const interestValue = calculateFunction(
    defaultTo(0, prop('value', interest)),
    amount,
  )

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

  return getInterestInstallment(
    isFree(free, index) ? [] : interestRate, index, amount,
  )
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
