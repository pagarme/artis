import React from 'react'
import { storiesOf } from '@storybook/react'

import SegmentedSwitch from '../../src/components/SegmentedSwitch'

import style from './style.css'


class SegmentedSwitchState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount () {
    this.setState({
      selected: this.props.selected,
    })
  }

  handleChange (value) {
    this.setState({ selected: value })
  }

  render () {
    return (
      <SegmentedSwitch
        items={this.props.items}
        onChange={this.handleChange}
        name={this.props.name}
        selected={this.state.selected}
      />
    )
  }
}

const twoItems = [
  {
    value: 'creaditcard',
    title: 'Cartão de Crédito',
    subtitle: 'Em até 2x sem juros com 20% de desconto na primeira parcela',
  },
  {
    value: 'bankbill',
    title: 'Boleto bancário',
    subtitle: '10% de desconto',
  },
]

const FourItems = [
  {
    value: 'creaditcard',
    title: 'Cartão de Crédito',
    subtitle: 'Em até 2x sem juros com 20% de desconto na primeira parcela',
  },
  {
    value: 'voucher',
    title: 'Voucher',
    subtitle: '20% de desconto',
  },
  {
    value: 'bankbill',
    title: 'Boleto bancário',
    subtitle: '10% de desconto',
  },
  {
    value: 'bitcoin',
    title: 'Bitcoin',
    subtitle: '20% de desconto',
  },
]

storiesOf('SegmentedSwitch', module)
  .add('Default Theme', () => (
    <div className={style.container}>
      <section>
        <h2>Two options</h2>
        <SegmentedSwitchState
          items={twoItems}
          selected={twoItems[0]}
          name="live-test"
        />
      </section>
      <section>
        <h2>Four options</h2>
        <SegmentedSwitchState
          items={FourItems}
          selected={FourItems[2]}
          name="super-extra"
        />
      </section>
    </div>
  ))
