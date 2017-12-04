import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import ProgressBar from '../../src/components/ProgressBar'

class Wrapper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      progress: 0,
    }
  }

  updateProgress () {
    this.setState({ progress: this.state.progress + 1 })
  }

  render () {
    return (
      <Fragment>
        <ProgressBar steps={3} progress={this.state.progress} />
        <br />
        <button onClick={() => this.updateProgress()}>Forward</button>
      </Fragment>
    )
  }
}

storiesOf('Progress Bar')
  .add('3 steps', () => (
    <Wrapper />
  ))
