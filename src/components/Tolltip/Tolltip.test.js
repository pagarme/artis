import React from 'react'
import { mount } from 'enzyme'

import Tolltip from './index'

describe('Tolltip', () => {
  it('should be have a text', () => {
    const component = mount(
      <Tolltip text="example text" />
    )

    expect(component.contains('example text')).toBeTruthy()
  })
})
