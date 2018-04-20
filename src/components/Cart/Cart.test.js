import React from 'react'
import { mount } from 'enzyme'

import createStore from '../../store'
import formatToBRL from '../../utils/helpers/formatToBRL'
import Cart from './index'

const store = createStore({
  transaction: {
    amount: 15000,
  },
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

const shippingRate = 5000

describe('Cart', () => {
  it('should have two items', () => {
    const onToggleCart = jest.fn()

    const component = mount(
      <Cart
        items={items}
        onToggleCart={onToggleCart}
        collapsed={false}
        showCloseButton={false}
        store={store}
        shippingRate={shippingRate}
      />
    )

    expect(component.find('li')).toHaveLength(3)
  })

  it('Must have two items', () => {
    const onToggleCart = jest.fn()

    const component = mount(
      <Cart
        items={items}
        onToggleCart={onToggleCart}
        showCloseButton
        collapsed={false}
        store={store}
        shippingRate={shippingRate}
      />
    )

    const totalValue = component.find('p').last().text()
    const totalValueToCompare = formatToBRL(15000)

    expect(totalValue).toBe(totalValueToCompare)
  })
})

