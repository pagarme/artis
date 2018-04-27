import {
  evolve,
  identity,
  ifElse,
  of,
} from 'ramda'

const changeInstallmentsToArray = evolve({
  installments: ifElse(
    Array.isArray,
    identity,
    of
  ),
})

export default changeInstallmentsToArray
