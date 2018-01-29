const amountBRLParse = (int) => {
  let tmp = `${int}`
  tmp = tmp.replace(/([0-9]{2})$/g, ',$1')
  if (tmp.length > 6) {
    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')
  }

  return `R$ ${tmp}`
}

export {
  amountBRLParse, // eslint-disable-line
}
