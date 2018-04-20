import formatInstallments from './formatInstallments'
import { generateInstallments } from './../calculations'

const getInstallments = (amount, creditcard, index) => {
  const { installments } = creditcard
  const installmentsOptions = formatInstallments(generateInstallments(
    amount,
    installments[index]
  ))

  return installmentsOptions
}

export default getInstallments
