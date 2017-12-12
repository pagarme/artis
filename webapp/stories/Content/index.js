import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import Content from '../../src/components/Content'
import style from './styles.css'

const CustomerData = () => (<div className={style.page}>Customer Data</div>)
const AddressData = () => (<div className={style.page}>Address Data</div>)
const PaymentData = () => (<div className={style.page}>Payment Data</div>)
const Success = () => (<div className={style.page}>Success!</div>)

class Wrapper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      navigateTo: null,
    }
  }

  navigateTo (navigateTo) {
    this.setState({ navigateTo })
  }

  render () {
    return (
      <Fragment>
        <Content navigateTo={this.state.navigateTo}>
          <CustomerData />
          <AddressData />
          <PaymentData />
          <Success />
        </Content>
        <button onClick={this.navigateTo.bind(this, 'first')}>First</button>
        <button onClick={this.navigateTo.bind(this, 'prev')}>Previous</button>
        <button onClick={this.navigateTo.bind(this, 'next')}>Next</button>
        <button onClick={this.navigateTo.bind(this, 'last')}>Last</button>
      </Fragment>
    )
  }
}

storiesOf('Content', module)
  .add('Page transition', () => (
    <Wrapper />
  ))
