import formatToBRL from '../helpers/formatToBRL'

const isFree = (freeInstallments, value) => value > freeInstallments

const getInstallmentAmount = (amount, installments) => (amount / installments).toFixed(0)

const getInterest = (amount, interest) => (amount * (interest / 100))

const getInterestInstallment = (index, amount, interestRate) => {
  const interest = getInterest(amount, interestRate)
  const newAmount = amount + interest
  const installmentAmount = getInstallmentAmount(newAmount, index)
  const parsedAmount = formatToBRL(installmentAmount)

  return {
    interest,
    installmentAmount,
    value: index,
    name: `${index}x de ${parsedAmount} com juros.`,
    amount: newAmount,
  }
}

const getFreeInstallment = (index, amount) => {
  const installmentAmount = getInstallmentAmount(amount, index)
  const parsedAmount = formatToBRL(installmentAmount)

  return {
    amount,
    installmentAmount,
    value: index,
    name: `${index}x de ${parsedAmount} sem juros.`,
  }
}

const calculateInstallmentAmount = (
  interestRate,
  freeInstallments,
  amount,
) => (value) => {
  const index = value + 1

  if (isFree(freeInstallments, index)) {
    return getInterestInstallment(index, amount, interestRate)
  }

  return getFreeInstallment(index, amount)
}

const calculate = (creditcard, amount) => {
  const {
    maxInstallments,
    interestRate,
    freeInstallments,
  } = creditcard

  if (!maxInstallments) {
    return []
  }

  const installments = Array.from(
    { length: maxInstallments }
  ).map(Number.call, Number)

  const generateInstallments = calculateInstallmentAmount(interestRate, freeInstallments, amount)

  return installments.map(generateInstallments)
}

export default calculate
