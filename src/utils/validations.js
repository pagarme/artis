import { isNil } from 'ramda'

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

export {
  isNumber,
  isEmail,
  required,
}
