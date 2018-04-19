import React from 'react'
import { mount } from 'enzyme'

import Footer from './index'

describe('Footer', () => {
  const component = mount(
    <Footer />
  )

  it('should render the correct texts', () => {
    expect(component.text()).toContain('Ambiente Seguro')
    expect(component.text()).toContain('Tecnologia Pagar.me')
  })
})
