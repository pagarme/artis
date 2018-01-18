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
import { Action, withStatechart } from 'react-automata'

import ProgressBar from '../../components/ProgressBar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

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
        NEXT: {
          billing: {
            cond: extState => !extState.isDesktop,
          },
          shipping: {
            cond: extState => extState.isDesktop,
          },
        },
      },
      onEntry: 'customer',
    },
    billing: {
      on: {
        PREV: 'customer',
        NEXT: 'shipping',
      },
      onEntry: 'billing',
    },
    shipping: {
      on: {
        PREV: {
          billing: {
            cond: extState => !extState.isDesktop,
          },
          customer: {
            cond: extState => extState.isDesktop,
          },
        },
        NEXT: 'payment',
      },
      onEntry: 'shipping',
    },
    payment: {
      on: {
        PREV: 'shipping',
        SUCCESS: 'success',
        ERROR: 'error',
      },
      onEntry: 'payment',
    },
    success: {
      onEntry: 'success',
    },
    error: {
      on: {
        FETCH: 'payment',
      },
      onEntry: 'error',
    },
  },
}

class Checkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activePage: 0,
      closingEffect: false,
      footerButtonVisible: true,
    }
  }

  handleNavigation (transitionTo, pages, steps) {
    this.props.transition(transitionTo, {
      isDesktop: checkDesktop,
    })

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

  handleFooterButton (footerButtonVisible) {
    this.setState({ footerButtonVisible })
  }

  renderPages () { // eslint-disable-line
    return (
      <React.Fragment>
        <Action show="customer">
          <CustomerPage
            desktop={checkDesktop}
            title="Dados Pessoais"
          />
        </Action>
        <Action show="billing">
          <BillingPage
            title="Endereço de Cobrança"
          />
        </Action>
        <Action show="shipping">
          <ShippingPage
            title="Selecione um endereço cadastrado"
            footerButtonVisible={this.handleFooterButton.bind(this)}
          />
        </Action>
        <Action show="payment">
          <PaymentPage
            title="Dados de Pagamento"
          />
        </Action>
      </React.Fragment>
    )
  }

  render () {
    const {
      activePage,
      footerButtonVisible,
    } = this.state
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
            onPrev={
              this.handleNavigation.bind(this, 'PREV', pages, steps)
            }
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
          <Footer
            total={params.amount}
            buttonText={'Continuar'}
            buttonClick={
              this.handleNavigation.bind(this, 'NEXT', pages, steps)
            }
            companyName={'Pagar.me'}
            buttonVisible={footerButtonVisible}
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

export default applyThemr(withStatechart(statechart)(Checkout))