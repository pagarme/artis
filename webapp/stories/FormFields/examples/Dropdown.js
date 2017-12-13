import React from 'react'

import Dropdown from '../../../src/components/Dropdown'


const options = [
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
  constructor (props) {
    super(props)
    this.state = { selected: '' }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (value) {
    this.setState({ selected: value })
  }

  render () {
    return (
      <div>
        <Dropdown
          options={options}
          name="pessoas"
          label="Pessoas"
          onChange={this.handleChange}
          value={this.state.selected}
          disabled={this.props.disabled}
          title={this.props.title}
          error={this.props.error}
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
      <DropdownState />
    </section>

    <section>
      <h3>With title</h3>
      <DropdownState title="Selecione alguem" />
    </section>

    <section>
      <h3>Disabled with title</h3>
      <DropdownState disabled title="Selecione alguem" />
    </section>

    <section>
      <h3>Disabled</h3>
      <DropdownState disabled />
    </section>

    <section>
      <h3>Error</h3>
      <DropdownState error="Something went wrong" />
    </section>

  </div>
)

export default DropdownExamples
