import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import ProgressBar from '../../src/components/ProgressBar'
import { Content } from '../../src/containers/Content'
import style from '../Content/styles.css'

const CustomerData = () => (<div className={style.page}>Customer Data</div>)
const AddressData = () => (<div className={style.page}>Address Data</div>)
const PaymentData = () => (<div className={style.page}>Payment Data</div>)
const Success = () => (<div className={style.page}>Success!</div>)

class Wrapper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      navigateTo: null,
      progress: 0,
    }
  }

  navigateToNext () {
    if (this.state.progress < 3) {
      this.setState({
        navigateTo: 'next',
        progress: this.state.progress + 1,
      })
    }
  }

  navigateToPrev () {
    if (this.state.progress > 0) {
      this.setState({
        navigateTo: 'prev',
        progress: this.state.progress - 1,
      })
    }
  }

  render () {
    return (
      <Fragment>
        <ProgressBar steps={3} progress={this.state.progress} />
        <br />
        <Content navigateTo={this.state.navigateTo}>
          <CustomerData />
          <AddressData />
          <PaymentData />
          <Success />
        </Content>
        <button onClick={this.navigateToPrev.bind(this)}>Previous Page</button>
        <button onClick={this.navigateToNext.bind(this)}>Next Page</button>
      </Fragment>
    )
  }
}

storiesOf('Progress Bar')
  .add('with content', () => (
    <Wrapper />
  ))
