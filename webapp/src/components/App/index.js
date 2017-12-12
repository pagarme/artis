import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
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
    const { target } = this.props

    this.setState({ closingEffect: true })

    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(
        document.getElementById(target)
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
  target: PropTypes.string.isRequired,
}

App.defaultProps = {
  target: 'app',
}

export default App
