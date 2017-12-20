import React from 'react'
import { shallow } from 'enzyme'

import Checkout from './'

describe('Main App', () => {
  const component = shallow(
    <Checkout
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
    />
  )

  it('renders without crashing', () => {
    expect(component).toBeTruthy()
  })
})
