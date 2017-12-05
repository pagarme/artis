import React from 'react'
import { mount } from 'enzyme'

import Button from './index'

describe('Button', () => {
  const onClick = jest.fn()

  const component = mount(
    <Button onClick={onClick}>
      Test
    </Button>
  )

  it('should be clicked', () => {
    component.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
