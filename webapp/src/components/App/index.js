import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  shape,
  string,
  number,
} from 'prop-types'
import classNames from 'classnames'

import Content from '../../containers/Content'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import defaultLogo from '../../images/logo_pagarme.png'
import style from './style.css'

class App extends Component {
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
          <Content navigateTo={this.state.navigateTo} />
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

App.propTypes = {
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

App.defaultProps = {
  apiValues: {
    configs: {
      image: '',
      theme: 'dark',
    },
  },
}

export default App
