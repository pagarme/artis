import React from 'react'
import { mount, shallow } from 'enzyme'
import EmailForm from './'
import Input from '../../components/Input'

describe('EmailForm', () => {
  it('should trigger close function', () => {
    const closeFn = jest.fn()

    const component = mount(
      <EmailForm
        handleClose={closeFn}
      />
    )

    component
      .find('button')
      .first()
      .simulate('click')

    expect(closeFn).toHaveBeenCalled()
  })

  it('should change correct states', () => {
    const closeFn = jest.fn()

    const component = shallow(
      <EmailForm
        handleClose={closeFn}
      />
    ).dive()

    const recipientInput = component
      .find(Input)
      .first()

    const emailInput = component
      .find(Input)
      .last()

    recipientInput.simulate('change', {
      target: {
        name: 'recipient',
        value: 'Fellowship of the Ring',
      },
    })

    emailInput.simulate('change', {
      target: {
        name: 'email',
        value: 'tolkien@lotr.me',
      },
    })

    expect(component.state('recipient')).toBe('Fellowship of the Ring')
    expect(component.state('email')).toBe('tolkien@lotr.me')
  })
})
