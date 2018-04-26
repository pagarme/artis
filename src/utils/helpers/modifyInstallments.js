import {
  evolve,
  identity,
  ifElse,
  of,
} from 'ramda'

const modifyInstallments = evolve({
  installments: ifElse(
    Array.isArray,
    identity,
    of
  ),
})

export default modifyInstallments
