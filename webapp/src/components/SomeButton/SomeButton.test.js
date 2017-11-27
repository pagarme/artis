import React from 'react'
import { shallow } from 'enzyme'

import SomeButton from './index'

describe('SomeButton', () => {
  const onClick = jest.fn()

  const component = shallow(
    <SomeButton onClick={onClick}>
      Test
    </SomeButton>
  )

  it('should be clicked', () => {
    component.simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
