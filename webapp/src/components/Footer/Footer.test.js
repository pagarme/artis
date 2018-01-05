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
    />
  )

  it('should have correct button text value', () => {
    const buttonText = component
      .find('button')
      .text()

    expect(buttonText).toContain('Compre muito!')
  })
})
