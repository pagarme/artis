import {
  __,
  assoc,
  divide,
  map,
  pipe,
  replace,
} from 'ramda'

const removeMask = replace(/[^a-zA-Z0-9]/g, '')

const removeMaskPlaceholder = replace(/_/gi, ' ')

const formatToBRL = (value) => {
  const floatValue = pipe(
    divide(__, 100),
    parseFloat,
  )

  const formatedMoney = floatValue(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  })

  return formatedMoney
}

const formatInstallments = map((item) => {
  const { value: installmentNumber } = item
  const interest = item.interest ? 'com juros' : 'sem juros'
  const formatedInstallmentAmount = formatToBRL(item.installmentAmount)

  const name =
    `${installmentNumber}x de ${formatedInstallmentAmount} ${interest}`

  return assoc('name', name, item)
})

export {
  formatInstallments,
  formatToBRL,
  removeMask,
  removeMaskPlaceholder,
}
