import React from 'react'
import { mount } from 'enzyme'

import Form from './index'
import Input from '../Input'

const lettersValidationMessage = 'Esse campo só permite letras'

function letters (value) {
  return (!/^[a-zA-Z]*$/g.test(value)) ? lettersValidationMessage : false
}

class InputWrapper extends React.Component {
  constructor () {
    super()
    this.state = { value: '' }

    this.updateValue = this.updateValue.bind(this)
  }

  updateValue (e) {
    this.setState({
      value: e.target.value,
    })
  }

  render () {
    return (
      <Form validation={{
        validationInput: [letters],
      }}
      >
        <Input
          name="validationInput"
          type="text"
          label="Seu nome"
          placeholder="Digite seu nome"
          onChange={this.updateValue}
          value={this.state.value}
        />
      </Form>
    )
  }
}

describe('Form', () => {
  it('validate input', () => {
    const component = mount(
      <InputWrapper />
    )

    component
      .find('input')
      .first()
      .simulate('change', { target: { value: '123' } })

    expect(
      component
        .find('p')
        .first()
        .text())
      .toBe(lettersValidationMessage)
  })
})
