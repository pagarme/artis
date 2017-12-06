import React from 'react'

import { action } from '@storybook/addon-actions'

import FaAndroid from 'react-icons/lib/fa/android'

import Input from '../../../src/components/Input'

class InputState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { email: 'Leo' }
  }

  updateEmail (e) {
    this.setState({
      email: e.target.value,
    })
  }

  render () {
    const {
      error,
      icon,
      multiline,
      type,
    } = this.props

    const {
      email,
    } = this.state

    return (
      <Input
        error={error}
        hint="Texto secundario"
        icon={icon}
        label="Digite seu email"
        multiline={multiline}
        name="email"
        onChange={this.updateEmail.bind(this)}
        placeholder="nome@email.com"
        type={type}
        value={email}
      />
    )
  }
}

InputState.defaultProps = {
  error: '',
  icon: null,
  multiline: false,
  type: null,
}


const InputExamples = () => (
  <div>
    <h2>Text Inputs</h2>

    <section>
      <h3>Disabled</h3>
      <Input
        name="email"
        label="Digite seu email"
        disabled
        hint="Texto secundário"
        placeholder="eae"
        onChange={action('text changed')}
      />
    </section>

    <section>
      <h3>Default</h3>
      <InputState type="text" />
    </section>

    <section>
      <h3>Error</h3>
      <InputState type="text" error="Email no formato errado" />
    </section>

    <section>
      <h3>Multiline disabled</h3>
      <Input
        name="teste"
        label="Fale tudo"
        multiline
        placeholder="eae"
        disabled
        onChange={action('text changed')}
      />
    </section>

    <section>
      <h3>Multiline default</h3>
      <InputState multiline placeholder="eae" />
    </section>

    <section>
      <h3>Multiline error</h3>
      <InputState multiline error="Erro!" />
    </section>

    <section>
      <h3>Icon disabled</h3>
      <Input
        name="name"
        label="Digite seu nome"
        placeholder="eaee"
        disabled
        icon={<FaAndroid size={20} />}
        onChange={action('text changed')}
      />
    </section>

    <section>
      <h3>Icon default</h3>
      <InputState type="text" icon={<FaAndroid size={20} />} />
    </section>

    <section>
      <h3>Icon error</h3>
      <InputState type="text" error="Erro!" icon={<FaAndroid size={20} />} />
    </section>

    <section>
      <h3>Icon multiline disabled</h3>
      <Input
        name="teste"
        label="Fale tudo"
        placeholder="eae"
        multiline
        disabled
        icon={<FaAndroid size={20} />}
        onChange={action('text changed')}
      />
    </section>

    <section>
      <h3>Icon multiline default</h3>
      <InputState multiline icon={<FaAndroid size={20} />} />
    </section>

    <section>
      <h3>Icon multiline error</h3>
      <InputState multiline error="Erro!" icon={<FaAndroid size={20} />} />
    </section>

    <section>
      <h3>Password disabled</h3>
      <Input
        type="password"
        name="pass"
        label="Digite sua senha"
        disabled
        placeholder="eae"
        hint="Minimo de 12 pixels"
        onChange={action('text changed')}
      />
    </section>

    <section>
      <h3>Password default</h3>
      <InputState type="password" />
    </section>

    <section>
      <h3>Password error</h3>
      <InputState type="password" error="Digite mais caracteres" />
    </section>
  </div>
)

export default InputExamples
