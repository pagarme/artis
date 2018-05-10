import React from 'react'
import { mount } from 'enzyme'

import { formatToBRL } from '../../utils/masks/'
import Cart from './index'
import createStore from '../../store'

const store = createStore({
  transaction: {
    amount: 10000,
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
    id: 2,
    title: 'Blue pill',
    unitPrice: 5000,
    quantity: 1,
    tangible: true,
  },
]

const customer = {
  name: 'Dan Abramov',
  documentNumber: '19981596639',
  email: 'mercurio@pagar.me',
  phoneNumber: '1130442277',
}

const shipping = {
  street: 'Rua Fidêncio Ramos',
  number: '308',
  additionalInfo: 'Pagar.me',
  neighborhood: 'Vila Olimpia',
  city: 'São Paulo',
  state: 'SP',
  zipcode: '04551010',
  fee: 5000,
}

const amount = {
  initial: 10000,
  final: 15000,
}

describe('Cart', () => {
  it('should render shipping fee value', () => {
    const component = mount(
      <Cart
        amount={amount}
        shipping={shipping}
        store={store}
      />
    )

    expect(
      component
        .find('div')
        .last()
        .find('p')
        .contains('R$ 50.00')
    ).toBeTruthy()
  })

  it('should render amount', () => {
    const component = mount(
      <Cart
        amount={amount}
        store={store}
      />
    )

    const totalValue = component.find('p').last().text()
    const totalValueToCompare = formatToBRL(15000)

    expect(totalValue).toBe(totalValueToCompare)
  })

  it('should decrease amount using shipping fee', () => {
    const component = mount(
      <Cart
        store={store}
        amount={amount}
        items={items}
        shipping={shipping}
      />
    )

    const value = component.find('p').get(9).props.children
    const totalValueToCompare = formatToBRL(5000)

    expect(value).toBe(totalValueToCompare)
  })

  it('should render items', () => {
    const component = mount(
      <Cart
        amount={amount}
        store={store}
        items={items}
      />
    )

    expect(component.contains('Red pill')).toBeTruthy()
    expect(component.contains('Blue pill')).toBeTruthy()
  })

  it('should not render name without customer', () => {
    const component = mount(
      <Cart
        amount={amount}
        store={store}
      />
    )

    expect(component.contains('Nome')).toBeFalsy()
  })

  it('should render name and email', () => {
    const component = mount(
      <Cart
        amount={amount}
        store={store}
        customer={customer}
      />
    )

    expect(component.contains('Nome')).toBeTruthy()
    expect(component.contains('E-mail')).toBeTruthy()
    expect(component.contains('Dan Abramov')).toBeTruthy()
    expect(component.contains('mercurio@pagar.me')).toBeTruthy()
  })

  it('should not render delivery whithout shipping', () => {
    const component = mount(
      <Cart
        amount={amount}
        store={store}
        customer={customer}
      />
    )

    expect(component.contains('Entrega')).toBeFalsy()
  })

  it('should not render delivery', () => {
    const component = mount(
      <Cart
        amount={amount}
        store={store}
        shipping={shipping}
      />
    )

    const shippingLines = component.debug()

    const containsLine1 = shippingLines.includes(
      'Rua Fidêncio Ramos 308 - Pagar.me'
    )

    const containsLine2 = shippingLines.includes(
      'CEP 04551-010 - São Paulo - SP'
    )

    expect(component.contains('Entrega')).toBeTruthy()
    expect(containsLine1 && containsLine2).toBeTruthy()
  })
})
