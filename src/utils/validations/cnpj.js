const isCNPJ = (value) => {
  const cnpj = value.replace(/[^\d]+/g, '')

  if (cnpj === '') return false

  if (cnpj.length !== 14) return false

  if (cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999') return false

  let range = cnpj.length - 2
  let numbers = cnpj.substring(0, range)
  const digitos = cnpj.substring(range)
  let soma = 0
  let pos = range - 7

  for (let i = range; i >= 1; i -= 1) {
    soma += numbers.charAt(range - i) * pos-- // eslint-disable-line no-plusplus

    if (pos < 2) pos = 9
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

  if (`${resultado}` !== digitos.charAt(0)) return false

  range += 1
  numbers = cnpj.substring(0, range)
  soma = 0
  pos = range - 7

  for (let i = range; i >= 1; i -= 1) {
    soma += numbers.charAt(range - i) * pos-- // eslint-disable-line no-plusplus

    if (pos < 2) pos = 9
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

  if (`${resultado}` !== digitos.charAt(1)) return false

  return true
}

export default isCNPJ
