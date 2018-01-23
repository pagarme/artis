import {
  __,
  addIndex,
  allPass,
  ap,
  apply,
  both,
  complement,
  contains,
  equals,
  either,
  isEmpty,
  length,
  map,
  modulo,
  nth,
  pipe,
  replace,
  split,
  subtract,
  sum,
  take,
  toString,
} from 'ramda'

// CNPJ = String of length 14
// CPF = String of length 11
// ID = CNPJ or CPF
// RAW_ID = ID before special characters cleanup
// DIGIT = Number from 0 to 9


const blackList = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
]

const mapIndexed = addIndex(map)

const weigthMasks = {
  // for cpf
  9: [10, 9, 8, 7, 6, 5, 4, 3, 2],
  10: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
  // for cnpj
  12: [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  13: [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
}

// String -> String
const clean = replace(/[^\d]+/g, '')

// ID -> Boolean
const hasValidForm = complement(either(isEmpty, contains(__, blackList)))

// [Number] -> ID -> DIGIT
const generateDigitWithMask = mask => pipe(
  take(length(mask)),
  split(''),
  mapIndexed((el, i) => el * mask[i]),
  sum,
  modulo(__, 11),
  subtract(11, __)
)

// Number -> ID -> DIGIT
const digit = index => pipe(
  nth(index),
  Number
)

// Number -> ID -> Boolean
const validateDigit = index => subject =>
  apply(
    equals,
    ap([
      digit(index),
      generateDigitWithMask(weigthMasks[index], index),
    ], [subject])
  )

// [Number] -> ID -> [Number] -> ID -> Boolean
const validateDigits = pipe(
  ap([validateDigit]),
  allPass
)

// [Number] -> ID -> Boolean
const validateId = indexes => pipe(
  toString,
  clean,
  both(hasValidForm, validateDigits(indexes))
)

// ID -> Boolean
const cnpj = validateId([12, 13])

// ID -> Boolean
const cpf = validateId([9, 10])

export function cpfValidation (value) {
  return cpf(value) ? '' : 'Esse não é um cpf válido'
}

export function cnpjValidation (value) {
  return cnpj(value) ? '' : 'Esse não é um cnpj válido'
}

