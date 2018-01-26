import {
  gte,
  filter,
  map,
  pipe,
} from 'ramda'

const filterInstallment = range => ({ value }) => gte(range, value)

const calculateInstallment = (
  interestRate,
  freeInstallment,
) => {
  return {}
}

const calculate = (creditcard, installments, amount) => {
  const {
    maxInstallments,
    interestRate,
    freeInstallment,
  } = creditcard

  return pipe(
    filter(filterInstallment(maxInstallments)),
    map(calculateInstallment(freeInstallment, interestRate))
  )(installments)
}

export {
  filterInstallment,
}

export default calculate
