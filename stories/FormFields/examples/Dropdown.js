import React from 'react'
import { Dropdown, FormDropdown } from 'former-kit'

const defaultOptions = [
  {
    name: '1x de R$ 100,00 sem juros',
    value: '100',
  },
  {
    name: '2x de R$ 50,00 sem juros',
    value: '100',
  },
  {
    name: '3x de R$ 33,33 sem juros',
    value: '100',
  },
  {
    name: '4x de R$ 30,00 com juros',
    value: '120',
  },
]

const inputOptions = [
  {
    name: 'Leonardo',
    value: 'leonardo',
  },
  {
    name: 'Donatello',
    value: 'donatello',
  },
  {
    name: 'Raphael',
    value: 'raphael',
  },
  {
    name: 'Michelangelo',
    value: 'michelangelo',
  },
]

class DropdownState extends React.Component {
  constructor () {
    super()

    this.state = {
      selected: 'leonardo',
    }
  }

  handleChange = (e) => {
    this.setState({
      selected: e.target.value,
    })
  }

  render () {
    return (
      <div>
        <FormDropdown
          options={inputOptions}
          name="pessoas"
          placeholder="Pessoas"
          disabled={this.props.disabled}
          error={this.props.error}
          onChange={this.handleChange}
          value={this.state.selected}
        />

        <p>Selecionado: {this.state.selected}</p>
      </div>
    )
  }
}

DropdownState.defaultProps = {
  disabled: false,
  error: '',
  title: '',
}

const DropdownExamples = () => (
  <div>
    <h2>Dropdown</h2>

    <section>
      <h3>Default</h3>
      <Dropdown
        options={defaultOptions}
        name="former-kit"
        placeholder="Em quantas parcelas?"
      />
    </section>

    <section>
      <h3>Default disabled</h3>
      <Dropdown
        options={defaultOptions}
        name="former-kit"
        placeholder="Em quantas parcelas?"
        disabled
      />
    </section>

    <section>
      <h3>Default error</h3>
      <Dropdown
        options={defaultOptions}
        name="former-kit"
        placeholder="Em quantas parcelas?"
        error="Esse campo é obrigatório"
      />
    </section>

    <section>
      <h3>Input</h3>
      <DropdownState />
    </section>

    <section>
      <h3>Input disabled</h3>
      <DropdownState
        disabled
      />
    </section>

    <section>
      <h3>Input disabled</h3>
      <DropdownState
        error="Esse campo é obrigatório"
      />
    </section>

  </div>
)

export default DropdownExamples
