import { prop } from 'ramda'

function calcAmountFromCartItens (cart) {
  const items = prop('items', cart)

  return items.reduce((acc, cur) => acc + (cur.unitPrice * cur.quantity), 0)
}

const calcAmount = (cart, shipping, transaction) => {
  const amount = prop('amount', transaction)
  const fee = prop('fee', shipping)

  if (amount) {
    return amount
  }

  const finalAmount = calcAmountFromCartItens(cart)

  return fee + finalAmount
}

export default calcAmount
