import React from 'react'
import { shallow } from 'enzyme'

import Checkout from './'
import createStore from '../../redux/store'

const store = createStore({
  transaction: {
    amount: 10000,
  },
})

describe('Main App', () => {
  const component = shallow(
    <Checkout
      store={store}
      apiValues={{
        key: 'some_key',
        configs: {
          image: 'some_image',
          theme: 'dark',
          target: '#some-div',
        },
        params: {
          amount: 11341,
          paymentMethod: 'creditcard',
        },
      }}
      targetElement={React.createElement('div')}
    />
  )

  it('renders without crashing', () => {
    expect(component).toBeTruthy()
  })
})
