import React from 'react'
import { mount } from 'enzyme'

import Cart from './index'

const items = [
  {
    description: 'Item 1',
    quantity: 1,
    amount: 5000,
  },
  {
    description: 'Item 2',
    quantity: 1,
    amount: 5000,
  },
  {
    description: 'Item 3',
    quantity: 1,
    amount: 5000,
  },
]

const amount = 15000

describe('Cart', () => {
  it('should have three items', () => {
    const component = mount(
      <Cart items={items} amount={amount} />
    )

    expect(component.find('li')).toHaveLength(3)
  })

  it('Must have three items', () => {
    const component = mount(
      <Cart items={items} amount={amount} />
    )

    expect(component.find('p').last().text()).toBe('R$ 150,00')
  })
})

