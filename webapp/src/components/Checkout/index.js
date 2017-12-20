import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  shape,
  string,
  number,
} from 'prop-types'
import classNames from 'classnames'

import Content from '../Content'
import Header from '../Header'
import Footer from '../Footer'
import { pages } from '../../pages'

import defaultLogo from '../../images/logo_pagarme.png'
import style from './style.css'

class Checkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      navigateTo: 'next',
      closingEffect: false,
    }
  }

  handleNavigation (navigateTo) {
    this.setState({ navigateTo })
  }

  close () {
    const { configs } = this.props.apiValues

    this.setState({ closingEffect: true })

    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(
        document.getElementById(configs.target)
      )
    }, 500)
  }

  render () {
    return (
      <div
        className={classNames(
          style.checkout,
          {
            [style.closingEffect]: this.state.closingEffect,
          },
        )}
      >
        <div className={style.wrapper}>
          <Header
            logoAlt="Pagar.me"
            logoSrc={defaultLogo}
            onPrev={this.handleNavigation.bind(this, 'prev')}
            onClose={this.close.bind(this)}
          />
          <Content
            pages={pages}
            navigateTo={this.state.navigateTo}
          />
          <Footer
            total={33000.15}
            buttonText={'Continuar'}
            buttonClick={this.handleNavigation.bind(this, 'next')}
            companyName={'Pagar.me'}
          />
        </div>
      </div>
    )
  }
}

Checkout.propTypes = {
  apiValues: shape({
    key: string.isRequired,
    configs: shape({
      image: string,
      theme: string,
      target: string.isRequired,
    }).isRequired,
    params: shape({
      amount: number.isRequired,
      paymentMethod: string.isRequired,
    }),
  }).isRequired,
}

Checkout.defaultProps = {
  apiValues: {
    configs: {
      image: '',
      theme: 'dark',
    },
  },
}

export default Checkout
