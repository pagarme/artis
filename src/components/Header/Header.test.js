import React from 'react'
import { mount } from 'enzyme'

import Header from './index'
import { ProgressBar } from '..'
import steps from '../../containers/Checkout/steps'
import LinearProgress from '../../former-kit/LinearProgress'

describe('Header', () => {
  it('should mount', () => {
    const component = mount(
      <Header />
    )

    expect(component.find('img')).toHaveLength(0)
  })

  it('should filter visible steps', () => {
    const activeStep = 'addresses'

    const component = mount(
      <Header
        steps={steps}
        activeStep={activeStep}
      />
    )

    expect(component.find(ProgressBar).props().steps).toHaveLength(4)
  })

  it('should calculate progress 50 percent', () => {
    const activeStep = 'addresses'

    const component = mount(
      <Header
        steps={steps}
        activeStep={activeStep}
      />
    )

    expect(component.find(LinearProgress).props().value).toBe(50)
  })

  it('should calculate progress 100 percent', () => {
    const activeStep = 'confirmation'

    const component = mount(
      <Header
        steps={steps}
        activeStep={activeStep}
      />
    )

    expect(component.find(LinearProgress).props().value).toBe(100)
  })
})
