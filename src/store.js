/* eslint-disable no-underscore-dangle */
import {
  createStore,
} from 'redux'

import reducers from './reducers'

const addresses =
  localStorage.getItem('receiverAddresses')
    ? JSON.parse(localStorage.getItem('receiverAddresses'))
    : []

export default ({ customer, shipping, billing }) => createStore(
  reducers,
  { pageInfo: { customer, shipping, billing, addresses } },
)
