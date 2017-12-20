import React from 'react'
import { action } from '@storybook/addon-actions'
import FaAndroid from 'react-icons/lib/fa/android'

import Input from '../../../src/components/Input'

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
    } = this.props

    const {
      value,
    } = this.state

    return (
      <Input
        name="email"
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
}


const InputExamples = () => (
  <div>
    <h2>Text Inputs</h2>

    <section>
      <h3>Default</h3>
      <InputState
        type="text"
        label="Nome"
        placeholder="Digite seu nome"
      />
    </section>

    <section>
      <h3>Error</h3>
      <InputState
        type="text"
        label="E-mail"
        placeholder="Digite seu e-mail"
        error="Email no formato errado"
      />
    </section>

    <section>
      <h3>Multiline default</h3>
      <InputState
        multiline
        label="Mensagem"
        placeholder="Tecle enter para saltar uma linha"
      />
    </section>

    <section>
      <h3>Icon default</h3>
      <InputState
        type="text"
        label="Com icone"
        placeholder="It's so cool"
        icon={<FaAndroid size={20} />}
      />
    </section>

    <section>
      <h3>Password default</h3>
      <InputState
        type="password"
        label="Senha"
        placeholder="Digite sua senha"
      />
    </section>

    <section>
      <h3>Disabled</h3>
      <Input
        name="email"
        label="Digite seu email"
        hint="Texto de apoio"
        placeholder="eae"
        onChange={action('text changed')}
        disabled
      />
    </section>
  </div>
)

export default InputExamples
