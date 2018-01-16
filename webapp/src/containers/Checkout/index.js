/* eslint-disable react/forbid-prop-types, react/prop-types */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  shape,
  string,
  number,
  object,
} from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { State, withStateMachine } from 'react-automata'

import ProgressBar from '../../components/ProgressBar'
import Header from '../../components/Header'

import FooterContainer from '../FooterContainer'
import CustomerPage from '../CustomerPage'
import BillingPage from '../BillingPage'
import ShippingPage from '../ShippingPage'
import PaymentPage from '../PaymentPage'

import defaultLogo from '../../images/logo_pagarme.png'

const applyThemr = themr('UICheckout')

const checkDesktop = window.innerWidth > 640

const statechart = {
  initial: 'customer',
  pages: {
    customer: 'Identificação',
    billing: 'Endereço de Cobrança',
    shipping: 'Endereço de Entrega',
    payment: 'Forma de Pagamento',
  },
  states: {
    customer: {
      on: {
        NEXT: checkDesktop ? 'shipping' : 'billing',
      },
    },
    billing: {
      on: {
        PREV: 'customer',
        NEXT: 'shipping',
      },
    },
    shipping: {
      on: {
        PREV: checkDesktop ? 'customer' : 'billing',
        NEXT: 'payment',
      },
    },
    payment: {
      on: {
        PREV: 'shipping',
        SUCCESS: 'success',
        ERROR: 'error',
      },
    },
    success: {
      onEntry: 'enterSuccess',
    },
    error: {
      on: {
        NEXT: 'payment',
      },
    },
  },
}

class Checkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      closingEffect: false,
      activePage: 0,
    }
  }

  handleNavigation (transitionTo, pages, steps) {
    this.props.transition(transitionTo)

    const inc = transitionTo === 'NEXT' ? 1 : -1

    this.setState({
      activePage: steps.findIndex(page => (
        page === pages[this.props.machineState]
      )) + inc,
    })
  }

  close () {
    const { targetElement } = this.props

    this.setState({ closingEffect: true })

    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(
        targetElement
      )
    }, 500)
  }

  renderPages () { // eslint-disable-line
    return (
      <React.Fragment>
        <State name="customer">
          <CustomerPage
            desktop={checkDesktop}
            title="Dados Pessoais"
          />
        </State>
        <State name="billing">
          <BillingPage
            title="Endereço de Cobrança"
          />
        </State>
        <State name="shipping">
          <ShippingPage
            title="Selecione um endereço cadastrado"
          />
        </State>
        <State show="payment">
          <PaymentPage
            title="Dados de Pagamento"
          />
        </State>
      </React.Fragment>
    )
  }

  render () {
    const { activePage } = this.state
    const { apiValues, theme } = this.props

    const { params = {}, configs = {} } = apiValues

    const { pages } = statechart

    if (checkDesktop) {
      delete pages.billing
    }

    const steps = Object.values(pages)

    return (
      <div
        className={classNames(
          theme.checkout,
          {
            [theme.closingEffect]: this.state.closingEffect,
          },
        )}
      >
        <div className={theme.wrapper}>
          <Header
            logoAlt="Pagar.me"
            logoSrc={configs.image || defaultLogo}
            onPrev={this.handleNavigation.bind(this, 'PREV', pages, steps)}
            onClose={this.close.bind(this)}
            prevButtonDisabled={activePage === 0}
          />
          <div className={theme.content}>
            <ProgressBar
              steps={checkDesktop ? steps : []}
              activePage={activePage}
            />
            {this.renderPages(checkDesktop)}
          </div>
          <FooterContainer
            total={params.amount}
            buttonText={'Continuar'}
            buttonClick={this.handleNavigation.bind(this, 'NEXT', pages, steps)}
            companyName={'Pagar.me'}
            nextButtonDisabled={activePage === steps.length - 1}
          />
        </div>
      </div>
    )
  }
}

Checkout.propTypes = {
  theme: shape({
    content: string,
    wrapper: string,
    closingEffect: string,
    checkout: string,
  }),
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
  targetElement: object.isRequired,
}

Checkout.defaultProps = {
  theme: {},
  apiValues: {
    configs: {
      image: '',
      theme: 'dark',
    },
  },
}

export default applyThemr(withStateMachine(statechart)(Checkout))
