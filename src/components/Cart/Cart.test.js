import React from 'react'
import { mount } from 'enzyme'

import createStore from '../../store'
import formatToBRL from '../../utils/helpers/formatToBRL'
import Cart from './index'

const store = createStore({
  amount: 15000,
})

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
  it('should have two items', () => {
    const onToggleCart = jest.fn()

    const component = mount(
      <Cart
        items={items}
        amount={amount}
        onToggleCart={onToggleCart}
        collapsed={false}
        showCloseButton={false}
        store={store}
      />
    )

    expect(component.find('li')).toHaveLength(2)
  })

  it('Must have two items', () => {
    const onToggleCart = jest.fn()

    const component = mount(
      <Cart
        items={items}
        amount={amount}
        onToggleCart={onToggleCart}
        showCloseButton
        collapsed={false}
        store={store}
      />
    )

    const totalValue = component.find('p').last().text()
    const totalValueToCompare = formatToBRL(15000)

    expect(totalValue).toBe(totalValueToCompare)
  })
})

