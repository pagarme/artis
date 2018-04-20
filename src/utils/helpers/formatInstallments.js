import { assoc } from 'ramda'
import formatToBRL from './formatToBRL'

const formatInstallments = (arr) => {
  const installments = arr.map((item, index) => {
    const interest = item.interest ? 'com juros' : 'sem juros'
    const installmentNumber = index + 1
    const formatedInstallmentAmount = formatToBRL(item.installmentAmount)

    const name =
      `${installmentNumber}x de ${formatedInstallmentAmount} ${interest}`

    return assoc('name', name, item)
  })

  return installments
}

export default formatInstallments
