import React from 'react'
import { mount } from 'enzyme'

import Switch from './index'

const render = () => null

describe('Switch', () => {
  it('should mount with two options', () => {
    const items = [
      {
        id: 'boleto',
        name: 'boleto',
        value: 'boleto',
        title: 'Boleto',
        subtitle: 'Desconto de 10%',
        content: render(),
      },
      {
        id: 'creditcard',
        name: 'creditcard',
        value: 'creditcard',
        title: 'Cartão de crédito',
        subtitle: 'Em até 3x sem juros',
        content: render(),
      },
    ]

    const onClick = jest.fn()

    const component = mount(
      <Switch
        items={items}
        selected={'boleto'}
        handleSwitchPayment={onClick}
        name="live-test"
      />
    )

    component.find('[role="button"]')
      .first()
      .simulate('click')

    expect(onClick).toHaveBeenCalledWith('boleto')
  })

  it('should mount with more than two options basic', () => {
    const items = [
      {
        id: 'boleto',
        name: 'boleto',
        value: 'boleto',
        title: 'Boleto',
        subtitle: 'Desconto de 10%',
        content: render(),
      },
      {
        id: 'creditcard',
        name: 'creditcard',
        value: 'creditcard',
        title: 'Cartão de crédito',
        subtitle: 'Em até 3x sem juros',
        content: render(),
      },
      {
        id: 'bitcoin',
        name: 'bitcoin',
        value: 'bitcoin',
        title: 'Bitcoin rules',
        subtitle: '0.0025 de desconto',
        content: render(),
      },
    ]

    const onClick = jest.fn()

    const component = mount(
      <Switch
        items={items}
        selected={'bitcoin'}
        handleSwitchPayment={onClick}
        name="live-test"
      />
    )

    component.find('[role="button"]')
      .last()
      .simulate('click')

    expect(onClick).toHaveBeenCalledWith('bitcoin')
  })
})
