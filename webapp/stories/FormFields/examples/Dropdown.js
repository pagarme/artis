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
  {
    name: 'Mr. Splinter',
    value: 'splinter',
  },
  {
    name: 'April O\'Neil',
    value: 'april',
  },
]


class DropdownContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: {
        name: '',
        value: '',
      },
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (selected) {
    this.setState({ selected })
  }

  render () {
    const { selected } = this.state
    return (
      <div>
        <Dropdown
          label="Tartarugas ninjas"
          options={options}
          onChange={this.handleChange}
          {...this.props}
        />
        <div>
          <p><strong>On change</strong></p>
          <p>Name: {selected.name}</p>
          <p>Value: {selected.value}</p>
        </div>
      </div>
    )
  }
}

DropdownContainer.defaultProps = {
  disabled: false,
  error: '',
  title: '',
}

const DropdownExamples = () => (
  <div>
    <h2>Dropdown</h2>

    <section>
      <h3>Default</h3>
      <DropdownContainer />
    </section>

    <section>
      <h3>Passing a selected value by default</h3>
      <DropdownContainer value="michelangelo" />
    </section>

    <section>
      <h3>Disabled</h3>
      <DropdownContainer disabled />
    </section>

    <section>
      <h3>Error</h3>
      <DropdownContainer error="Something is wrong" />
    </section>

  </div>
)

export default DropdownExamples
