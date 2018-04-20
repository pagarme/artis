const formatToBRL = (value) => {
  const brl = value / 100
  const floatValue = parseFloat(brl)

  const formatedMoney = floatValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  })

  return formatedMoney
}

export default formatToBRL
