import React from 'react'
import { mount } from 'enzyme'

import Header from './index'

describe('Header', () => {
  it('should mount', () => {
    const component = mount(
      <Header />
    )

    expect(component.find('img')).toHaveLength(1)
    expect(component.find('button')).toHaveLength(2)
  })

  it('should be click in all buttons', () => {
    const onClose = jest.fn()
    const onPrev = jest.fn()

    const component = mount(
      <Header onClose={onClose} onPrev={onPrev} />
    )

    component.find('button').forEach(button => button.simulate('click'))

    expect(onClose).toHaveBeenCalled()
    expect(onPrev).toHaveBeenCalled()
  })
})
