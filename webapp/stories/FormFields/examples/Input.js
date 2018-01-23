import React from 'react'
import { action } from '@storybook/addon-actions'
import FaAndroid from 'react-icons/lib/fa/android'

import Input from '../../../src/components/Input'
import Form from '../../../src/components/Form'

function letters (value) {
  return (!/^[a-zA-Z]*$/g.test(value)) ? 'Esse campo só permite letras' : false
}

function required (value) {
  return value ? false : 'Esse campo é obrigatório'
}

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
      <Input
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
      <Input
        name="email_disabled"
        label="Digite seu email"
        hint="Texto de apoio"
        placeholder="eae"
        onChange={action('text changed')}
        disabled
      />
    </section>

    <section>
      <h3>Letters Validation</h3>
      <Form validation={{
        validationInput: [letters, required],
      }}
      >
        <Input
          name="validationInput"
          type="text"
          label="Seu nome"
          placeholder="Digite seu nome"
        />
      </Form>
    </section>
  </div>
)

export default InputExamples
