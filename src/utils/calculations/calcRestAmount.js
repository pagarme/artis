const calcRestAmount = ({ amount, typedAmount, inputName }) => {
  const amountInCents = typedAmount * 100
  const finalAmount = (amount - amountInCents) / 100

  return {
    [inputName]: finalAmount,
  }
}

export default calcRestAmount
