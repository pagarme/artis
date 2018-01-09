import React from 'react'
import { mount } from 'enzyme'

import Button from './index'

describe('Button', () => {
  it('should be clicked', () => {
    const onClick = jest.fn()

    const component = mount(
      <Button onClick={onClick}>
        Test
      </Button>
    )

    component.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should not be clicked', () => {
    const onClick = jest.fn()

    const component = mount(
      <Button
        onClick={onClick}
        disabled
      >
        Test
      </Button>
    )

    component.simulate('click')
    expect(onClick).not.toHaveBeenCalled()
  })
})
