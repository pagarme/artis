const isCpfDefault = (value) => {
  let match = false
  const defaultValue = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
  ]

  defaultValue.map((item) => { //eslint-disable-line
    if (value === item) {
      match = true
    }
  })

  return match
}

const cpf = (document) => {
  const strCPF = document.toString().replace(/[^\w\s]/gi, '')
  let sum = 0
  let rest = 0
  let i = 0

  if (isCpfDefault(strCPF)) {
    return false
  }

  for (i = 1; i <= 9; i += 1) {
    sum += parseInt(strCPF.substring(i - 1, i)) * (11 - i) //eslint-disable-line
  }
  rest = (sum * 10) % 11

  if ((rest === 10) || (rest === 11)) rest = 0
  if (rest !== parseInt(strCPF.substring(9, 10))) return false //eslint-disable-line

  sum = 0
  for (i = 1; i <= 10; i += 1) sum += parseInt(strCPF.substring(i - 1, i)) * (12 - i) //eslint-disable-line
  rest = (sum * 10) % 11

  if ((rest === 10) || (rest === 11)) rest = 0
  if (rest !== parseInt(strCPF.substring(10, 11))) return false //eslint-disable-line
  return true
}

export default cpf
