import React from 'react'
import { shallow } from 'enzyme'

import App from './'

describe('Main App', () => {
  const component = shallow(
    <App
      apiValues={{
        key: 'some_key',
        configs: {
          image: 'some_image',
          theme: 'dark',
          target: '#some-div',
        },
        params: {
          amount: 123,
          paymentMethod: 'creditcard',
        },
      }}
    />
  )

  it('renders without crashing', () => {
    expect(component).toBeTruthy()
  })
})
