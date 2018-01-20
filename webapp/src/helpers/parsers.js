const amountBRLParse = number => number.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export {
  amountBRLParse, // eslint-disable-line import/prefer-default-export
}
