import React from 'react'
import { action } from '@storybook/addon-actions'
import FaAndroid from 'react-icons/lib/fa/android'

import FormInput from '../../../src/former-kit/FormInput'

class InputState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: '' }
  }

  updateValue (e) {
    this.setState({
      value: e.target.value,
    })
  }

  render () {
    const {
      error,
      icon,
      multiline,
      type,
      placeholder,
      label,
      hint,
      name,
    } = this.props

    const {
      value,
    } = this.state

    return (
      <FormInput
        name={name}
        type={type}
        icon={icon}
        label={label}
        placeholder={placeholder}
        hint={hint}
        multiline={multiline}
        value={value}
        onChange={this.updateValue.bind(this)}
        error={error}
      />
    )
  }
}

InputState.defaultProps = {
  error: '',
  icon: null,
  multiline: false,
  type: null,
  placeholder: '',
  label: '',
  hint: '',
  name: '',
}


const InputExamples = () => (
  <div>
    <h2>Text Inputs</h2>

    <section>
      <h3>Default</h3>
      <InputState
        name="default"
        type="text"
        label="Nome"
        placeholder="Digite seu nome"
      />
    </section>

    <section>
      <h3>Error</h3>
      <InputState
        name="error"
        type="text"
        label="E-mail"
        placeholder="Digite seu e-mail"
        error="Email no formato errado"
      />
    </section>

    <section>
      <h3>Multiline default</h3>
      <InputState
        name="multiline"
        multiline
        label="Mensagem"
        placeholder="Tecle enter para saltar uma linha"
      />
    </section>

    <section>
      <h3>Icon default</h3>
      <InputState
        name="icon"
        type="text"
        label="Com icone"
        placeholder="It's so cool"
        icon={<FaAndroid size={20} />}
      />
    </section>

    <section>
      <h3>Password default</h3>
      <InputState
        name="password"
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
      />
    </section>

    <section>
      <h3>Disabled</h3>
      <FormInput
        name="email_disabled"
        label="Digite seu email"
        hint="Texto de apoio"
        placeholder="eae"
        onChange={action('text changed')}
        disabled
      />
    </section>

    <section>
      <h3>Tooltip</h3>
      <FormInput
        name="email_disabled"
        label="Digite seu email"
        hint="Texto de apoio"
        placeholder="eae"
        onChange={action('text changed')}
        tooltip="This is a tooltip :)"
      />
    </section>
  </div>
)

export default InputExamples
