import React from 'react'
import { mount } from 'enzyme'

import Tooltip from './index'

describe('Tooltip', () => {
  it('should be have a text', () => {
    const component = mount(
      <Tooltip text="example text" />
    )

    expect(component.contains('example text')).toBeTruthy()
  })
})
