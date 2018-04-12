import formatToBRL from './formatToBRL'

const formatInstallments = (arr) => {
  const installments = arr.map((item, index) => {
    const interest = item.hasInterest ? 'com juros' : 'sem juros'
    const installmentNumber = index + 1

    return (
      {
        ...item,
        name: `${installmentNumber}x de ${formatToBRL(item.installmentAmount)} ${interest}`,
      }
    )
  })

  return installments
}

export default formatInstallments
