import {
  isNil,
  allPass,
  prop,
  pathOr,
  has,
} from 'ramda'
import removeMask from '../helpers/removeMask'

import cpf from './cpf'
import isDate from './card/date'

const isNumber = value => (!/^[0-9]+$/gi.test(value)
  ? 'Apenas números são permitidos'
  : false
)

const required = value => (
  (isNil(value) || value === '')
    ? 'Este campo é obrigatório'
    : false
)

const isEmail = value => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Deve ser um email válido'
  : false
)

const minLength = length => value => (
  removeMask(value).length < length
    ? `Esse campo precisa de ${length} caracteres`
    : false
)

const maxLength = length => value => (
  removeMask(value).length > length
    ? `Você excedeu o limite de ${length} caracteres`
    : false
)

const hasAllTransactionData = allPass([
  prop('customer'),
  prop('billing'),
  prop('shipping'),
  prop('payment'),
  prop('amount'),
  prop('publickey'),
  prop('postback'),
  prop('items'),
])

const hasRequiredPageData = (page, props) => {
  if (page === 'customer') {
    const customer = pathOr({}, ['apiData', 'formData', 'customer'], props)

    const customerHasAllProps = allPass([
      has('name'),
      has('documentNumber'),
      has('email'),
      has('phoneNumber'),
    ])

    return customerHasAllProps(customer)
  }

  if (page === 'addresses') {
    const billing = pathOr({}, ['apiData', 'formData', 'billing'], props)
    const shipping = pathOr({}, ['apiData', 'formData', 'shipping'], props)

    const addressHasAllProps = allPass([
      has('street'),
      has('number'),
      has('neighborhood'),
      has('city'),
      has('state'),
      has('zipcode'),
    ])

    return addressHasAllProps(billing) && addressHasAllProps(shipping)
  }

  return false
}

const isCpf = value => (!cpf(value)
  ? 'CPF inválido'
  : false)

const isValidDate = value => (!isDate(value)
  ? 'Data inválida'
  : false)

export {
  isCpf,
  hasAllTransactionData,
  hasRequiredPageData,
  isNumber,
  isEmail,
  isValidDate,
  maxLength,
  minLength,
  required,
}
