function returnOnlyNumbers (value) {
  return value.replace(/[^0-9]+/g, '')
}

function returnOnlyAlpha (value) {
  return value.replace(/[^0-9a-z]/gi, '')
}

export {
  returnOnlyNumbers,
  returnOnlyAlpha,
}
