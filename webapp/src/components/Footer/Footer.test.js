import React from 'react'
import { mount } from 'enzyme'

import Footer from './index'

describe('Footer', () => {
  const onClick = jest.fn()

  const component = mount(
    <Footer
      total={600}
      buttonText={'Compre muito!'}
      buttonClick={onClick}
      companyName={'Lesla Motors'}
    />
  )

  it('should have correct value', () => {
    const valueElement = component
      .find('span')
      .first()
      .text()

    expect(valueElement).toContain('600.00')
  })
})
