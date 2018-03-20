import React from 'react'
import { mount } from 'enzyme'

import Footer from './index'

describe('Footer', () => {
  const component = mount(
    <Footer
      companyName={'Tesla Motors'}
      cartButtonVisible
    />
  )

  it('should render powered by company', () => {
    expect(component.text()).toContain('Powered by Tesla Motors')
  })
})
