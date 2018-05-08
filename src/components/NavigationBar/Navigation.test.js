import React from 'react'
import { mount } from 'enzyme'

import NavigationBar from './index'

import createStore from '../../store'

const store = createStore({
  transaction: {
    amount: 10000,
  },
})

describe('NavigationBar', () => {
  it('should render the correct texts', () => {
    const component = mount(
      <NavigationBar store={store} />
    )

    const buttons = component.find('button')

    expect(buttons).toHaveLength(3)
    expect(buttons.first().text()).toBe('Ops, voltar')
    expect(buttons.last().text()).toBe('Continuar')
  })

  it('should trigger handleNextButton', () => {
    const handleNextButton = jest.fn()

    const component = mount(
      <NavigationBar
        store={store}
        handleNextButton={handleNextButton}
        formValid={false}
      />
    )

    component.find('button')
      .last()
      .simulate('click')

    expect(handleNextButton).toHaveBeenCalled()
  })

  it('should not trigger handleNextButton when form is invalid', () => {
    const handleNextButton = jest.fn()

    const component = mount(
      <NavigationBar
        store={store}
        handleNextButton={handleNextButton}
        formValid
      />
    )

    component.find('button')
      .last()
      .simulate('click')

    expect(handleNextButton).not.toHaveBeenCalled()
  })

  it('should trigger handlePreviousButton', () => {
    const handlePreviousButton = jest.fn()

    const component = mount(
      <NavigationBar
        store={store}
        handlePreviousButton={handlePreviousButton}
      />
    )

    component.find('button')
      .first()
      .simulate('click')

    expect(handlePreviousButton).toHaveBeenCalled()
  })
})
