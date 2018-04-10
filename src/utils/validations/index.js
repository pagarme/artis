import {
  always,
  allPass,
  concat,
  isNil,
  prop,
  pathOr,
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

const pagarmeTransactionParams = [
  prop('amount'),
  prop('shipping'),
  prop('items'),
  prop('postback'),
]

const commonTransactionParams = [
  prop('customer'),
  prop('billing'),
  prop('payment'),
  prop('key'),
]

const requiredTransactionParams = {
  pagarme: allPass(concat(commonTransactionParams, [pagarmeTransactionParams])),
  mundipagg: allPass(commonTransactionParams),
}

const customerValidation = allPass([
  prop('name'),
  prop('documentNumber'),
  prop('email'),
  prop('phoneNumber'),
])

const customerRequiredParams = {
  pagarme: customerValidation,
  mundipagg: (customer) => {
    if (customer.id) {
      return always(true)
    }

    return customerValidation
  },
}

const hasAllTransactionData = (acquirer, data) =>
  requiredTransactionParams[acquirer](data)

const hasRequiredPageData = (page, props) => {
  if (page === 'customer') {
    const customer = pathOr({}, ['apiData', 'formData', 'customer'], props)

    const customerHasAllProps = customerRequiredParams[props.acquirer]

    return customerHasAllProps(customer)
  }

  if (page === 'addresses') {
    const billing = pathOr({}, ['apiData', 'formData', 'billing'], props)
    const shipping = pathOr({}, ['apiData', 'formData', 'shipping'], props)

    const addressHasAllProps = allPass([
      prop('street'),
      prop('number'),
      prop('neighborhood'),
      prop('city'),
      prop('state'),
      prop('zipcode'),
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
