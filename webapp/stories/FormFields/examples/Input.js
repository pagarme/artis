import React from 'react'

import { action } from '@storybook/addon-actions'

import FaAndroid from 'react-icons/lib/fa/android'

import Input from '../../../src/components/Input'


class InputState extends React.Component {
  constructor (props) {
    super(props)
    this.state = { email: 'Leo' }
  }

  render () {
    const {
      boxed,
      error,
      icon,
      multiline,
      success,
      type,
    } = this.props

    const {
      email,
    } = this.state

    return (
      <Input
        boxed={!!boxed}
        error={error}
        hint={boxed ? '' : 'Texto secundario'}
        icon={icon}
        label="Digite seu email"
        multiline={multiline}
        name="email"
        onChange={e => this.setState({ email: e.target.value })}
        placeholder="nome@email.com"
        success={success}
        type={type}
        value={email}
      />
    )
  }
}

InputState.defaultProps = {
  boxed: false,
  error: '',
  icon: null,
  multiline: false,
  success: '',
  type: null,
}


const InputExamples = () => (
  <div>
    <h2>Text Inputs</h2>
    <section>
      <h3>Boxed disabled</h3>
      <Input
        name="name"
        label="Digite seu nome"
        placeholder="eaee"
        boxed
        disabled
        onChange={action('text changed')}
      />
    </section>

    <section>
      <h3>Boxed default</h3>
      <InputState boxed type="text" />
    </section>

    <section>
      <h3>Boxed error</h3>
      <InputState boxed type="text" error="Tá pegando fogo bixo" />
    </section>

    <section>
      <h3>Boxed success</h3>
      <InputState boxed type="text" success="Oloco meu" />
    </section>

    <section>
      <h3>Boxed multiline disabled</h3>
      <Input
        name="teste"
        label="Fale tudo"
        placeholder="eae"
        boxed
        multiline
        disabled
        onChange={action('text changed')}
      />
    </section>

    <section>
      <h3>Boxed multiline default</h3>
      <InputState boxed multiline />
    </section>

    <section>
      <h3>Boxed multiline error</h3>
      <InputState boxed multiline error="Erro!" />
    </section>

    <section>
      <h3>Boxed multiline success</h3>
      <InputState boxed multiline success="Sucesso!" />
    </section>

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
      <h3>Success</h3>
      <InputState type="text" success="Good jobi lirou frendi" />
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
      <h3>Multiline success</h3>
      <InputState multiline success="Sucesso!" />
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
      <h3>Icon success</h3>
      <InputState type="text" success="Sucesso!" icon={<FaAndroid size={20} />} />
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
      <h3>Icon multiline success</h3>
      <InputState multiline success="Sucesso!" icon={<FaAndroid size={20} />} />
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

    <section>
      <h3>Password success</h3>
      <InputState type="password" success="Boa rapá" />
    </section>
  </div>
)

export default InputExamples
