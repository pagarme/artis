import { isNil } from 'ramda'

const isNumber = value => (
  (isNil(value) || value === '')
    ? 'Should be a number'
    : null
)

const required = value => (
  (isNil(value) || value === '')
    ? 'This field is required'
    : false
)

const isEmail = value => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Should be email'
  : false
)

export {
  isNumber,
  isEmail,
  required,
}
