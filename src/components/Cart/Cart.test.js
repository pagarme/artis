import React from 'react'
import { mount } from 'enzyme'

import Cart from './index'

const items = [
  {
    id: 1,
    title: 'Red pill',
    unitPrice: 5000,
    quantity: 1,
    tangible: true,
  },
  {
    id: 1,
    title: 'Blue pill',
    unitPrice: 10000,
    quantity: 1,
    tangible: true,
  },
]

const amount = 15000

describe('Cart', () => {
  it('should have three items', () => {
    const onToggleCart = jest.fn()

    const component = mount(
      <Cart
        items={items}
        amount={amount}
        onToggleCart={onToggleCart}
        collapsed={false}
        showCloseButton={false}
      />
    )

    expect(component.find('li')).toHaveLength(2)
  })

  it('Must have three items', () => {
    const onToggleCart = jest.fn()

    const component = mount(
      <Cart
        items={items}
        amount={amount}
        onToggleCart={onToggleCart}
        showCloseButton
        collapsed={false}
      />
    )

    expect(component.find('p').last().text()).toBe('R$ 150,00')
  })
})

