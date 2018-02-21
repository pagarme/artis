import React from 'react'
import { mount } from 'enzyme'

import Footer from './index'

describe('Footer', () => {
  const onClick = jest.fn()

  const component = mount(
    <Footer
      buttonText={'Compre muito!'}
      buttonClick={onClick}
      companyName={'Tesla Motors'}
      buttonVisible
    />
  )

  it('should have correct button text value', () => {
    const buttonText = component
      .find('button')
      .text()

    expect(buttonText).toContain('Compre muito!')
  })

  it('should render powered by company', () => {
    expect(component.text()).toContain('Powered by Tesla Motors')
  })
})
