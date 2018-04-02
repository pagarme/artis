import { merge } from 'ramda'
import { calcRestAmount } from '../calculations'

const updateMultipleAmount = ({
  formData,
  newFormData,
  inputAmountNames,
  transaction,
}) => {
  const { amount } = transaction

  const firstAmountInputName = `${inputAmountNames.first}`
  const secondAmountInputName = `${inputAmountNames.second}`

  const firstTypedAmount = newFormData[firstAmountInputName]
  const secondTypedAmount = newFormData[secondAmountInputName]

  const oldFirstAmount = formData[firstAmountInputName]
  const oldSecondAmount = formData[secondAmountInputName]

  let calcConfig

  if (firstTypedAmount !== oldFirstAmount) {
    calcConfig = {
      amount,
      typedAmount: firstTypedAmount,
      inputName: secondAmountInputName,
    }
  }

  if (secondTypedAmount !== oldSecondAmount) {
    calcConfig = {
      amount,
      typedAmount: secondTypedAmount,
      inputName: firstAmountInputName,
    }
  }

  if (!calcConfig) {
    return newFormData
  }

  const finalAmount = calcRestAmount(calcConfig)

  return merge(newFormData, finalAmount)
}

export default updateMultipleAmount
