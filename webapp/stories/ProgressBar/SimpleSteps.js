import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import ProgressBar from '../../src/components/ProgressBar'

const steps = [
  'Identificação',
  'Endereço de Cobrança',
  'Forma de Pagamento',
]

class Wrapper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      progress: 0,
    }
  }

  progressIncrese () {
    if (this.state.progress < 3) {
      this.setState({ progress: this.state.progress + 1 })
    }
  }

  progressDecrease () {
    if (this.state.progress > 0) {
      this.setState({ progress: this.state.progress - 1 })
    }
  }

  render () {
    return (
      <Fragment>
        <ProgressBar steps={steps} activePage={this.state.progress} />
        <br />
        <button onClick={this.progressDecrease.bind(this)}>Backward</button>
        <button onClick={this.progressIncrese.bind(this)}>Forward</button>
      </Fragment>
    )
  }
}

storiesOf('Progress Bar', module)
  .add('3 steps', () => (
    <Wrapper />
  ))
