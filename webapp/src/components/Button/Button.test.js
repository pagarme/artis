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

  it('should have type reset', () => {
    const onClick = jest.fn()

    const component = mount(
      <Button
        onClick={onClick}
        disabled
        type={'reset'}
      >
        {'Click me like there\'s no tomorrow'}
      </Button>
    )

    expect(component.prop('type')).toEqual('reset')
  })

  it('should have default value for fill', () => {
    const onClick = jest.fn()

    const component = mount(
      <Button
        onClick={onClick}
        disabled
      >
        Action!!!!
      </Button>
    )

    expect(component.prop('fill')).toEqual('flat')
  })
})
