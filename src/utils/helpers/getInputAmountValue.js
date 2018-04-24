import { multiply, defaultTo, pipe, prop } from 'ramda'

const getInputAmountValue = (
  formData,
  inputAmountNames,
  position,
  amount
) =>
  pipe(
    prop(inputAmountNames[position]),
    multiply(100),
    defaultTo(amount),
  )(formData)

export default getInputAmountValue
