import React from 'react'
import { shallow } from 'enzyme'

import Switch from './index'

describe('Switch', () => {
  it('should mount with two options', () => {
    const paymentOptions = [
      {
        name: 'creaditcard',
        title: 'Cartão de Crédito',
        subtitle: 'Em até 2x sem juros com 20% de desconto na primeira parcela',
      },
      {
        name: 'bankbill',
        title: 'Boleto bancário',
        subtitle: '10% de desconto',
      },
    ]

    const onChange = jest.fn()

    const component = shallow(
      <Switch
        items={paymentOptions}
        selected={paymentOptions[1]}
        onChange={onChange}
        name="live-test"
      />
    ).dive()

    component.find('input')
      .first()
      .simulate('change')

    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('should mount with more than two options basic', () => {
    const paymentOptions = [
      {
        name: 'creaditcard',
        title: 'Cartão de Crédito',
        subtitle: 'Em até 2x sem juros com 20% de desconto na primeira parcela',
      },
      {
        name: 'bankbill',
        title: 'Boleto bancário',
        subtitle: '10% de desconto',
      },
      {
        name: 'bitcoin',
        title: 'Bitcoin',
        subtitle: '20% de desconto',
      },
    ]

    const onChange = jest.fn()

    const component = shallow(
      <Switch
        items={paymentOptions}
        onChange={onChange}
        selected={paymentOptions[1]}
        name="live-test"
      />
    ).dive()

    component.find('input')
      .last()
      .simulate('change')

    expect(onChange).toHaveBeenCalledWith(2)
    expect(component.state('selected')).toBe(2)
  })
})
