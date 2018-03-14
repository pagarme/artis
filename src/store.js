import {
  createStore,
} from 'redux'

import reducers from './reducers'

export default ({ customer, shipping, billing }) => createStore(
  reducers,
  { pageInfo: { customer, shipping, billing } },
)
