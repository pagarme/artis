import formatToCents from './formatToCents'

const getInputAmountValue = (
  formData,
  inputAmountNames,
  position,
  amount
) =>
  formatToCents(formData[inputAmountNames[position]]) || amount

export default getInputAmountValue
