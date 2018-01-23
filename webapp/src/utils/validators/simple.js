import validator from 'validator'
import {
  anyPass,
} from 'ramda'
import numberSize from './numberSize'
import {
  returnOnlyNumbers,
  returnOnlyAlpha,
} from '../regex'

const locale = 'pt-BR'
const phone = anyPass([numberSize(10), numberSize(11)])
const zipcode = numberSize(8)

function requiredValidation (value) {
  const valueToValidate = value && returnOnlyAlpha(value)

  return valueToValidate.length > 0 ? '' : 'Esse campo é obrigatório'
}

function lettersValidation (value) {
  return validator.isAlpha(value, locale) ? '' : 'Esse campo só permite letras'
}

function numbersValidation (value) {
  return isNaN(value) ? 'Esse campo deve ser numérico' : ''
}

function emailValidation (value) {
  return validator.isEmail(value) ? '' : 'Esse campo precisa ser um email'
}

function phoneValidation (value) {
  const cleanedValue = returnOnlyNumbers(value)

  return phone(cleanedValue) ? '' : 'O telefone está incorreto'
}

function zipcodeValidation (value) {
  const cleanedValue = returnOnlyNumbers(value)

  return zipcode(cleanedValue) ? '' : 'O cep está incorreto'
}

function maxLengthValidation (length) {
  return (value) => {
    const valueToValidate = value && returnOnlyAlpha(value)

    return valueToValidate.length > length ? 'Você excedeu o limite máximo de digitos' : ''
  }
}

function minLengthValidation (length) {
  return (value) => {
    const valueToValidate = value && returnOnlyAlpha(value)

    return valueToValidate.length < length ? 'Você não digitou o campo completo' : ''
  }
}

export {
  requiredValidation,
  lettersValidation,
  emailValidation,
  phoneValidation,
  zipcodeValidation,
  maxLengthValidation,
  numbersValidation,
  minLengthValidation,
}
