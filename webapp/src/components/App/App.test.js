import React from 'react'
import { shallow } from 'enzyme'

import App from './'

describe('Main App', () => {
  const component = shallow(
    <App />
  )

  it('renders without crashing', () => {
    expect(component).toBeTruthy()
  })
})
