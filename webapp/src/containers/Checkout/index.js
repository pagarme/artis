/* eslint-disable react/forbid-prop-types, react/prop-types */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { Action, withStatechart } from 'react-automata'

import ProgressBar from '../../components/ProgressBar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import CustomerPage from '../../pages/Customer'
import BillingPage from '../../pages/Billing'
import ShippingPage from '../../pages/Shipping'
import PaymentPage from '../../pages/Payment'
import SuccessPage from '../SuccessPage'

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
    success: 'Confirmação',
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

    this.handleFooterButton = this.handleFooterButton.bind(this)
  }

  handleNavigation (transitionTo, pages, steps) {
    this.props.transition(transitionTo, {
      isDesktop: checkDesktop,
    })

    const inc = transitionTo === 'NEXT' ? 1 : -1
    const activePage = steps.findIndex(page => (
      page === pages[this.props.machineState]
    )) + inc

    this.setState({
      activePage,
      footerButtonVisible: !(activePage === steps.length - 1),
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

  renderPages () {
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
            footerButtonVisible={this.handleFooterButton}
          />
        </Action>
        <Action show="payment">
          <PaymentPage
            title="Dados de Pagamento"
          />
        </Action>
        <Action show="success">
          <SuccessPage
            title="Confirmação"
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
              steps={steps}
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
  theme: PropTypes.shape({
    content: PropTypes.string,
    wrapper: PropTypes.string,
    closingEffect: PropTypes.string,
    checkout: PropTypes.string,
  }),
  apiValues: PropTypes.shape({
    key: PropTypes.string.isRequired,
    configs: PropTypes.shape({
      image: PropTypes.string,
      theme: PropTypes.string,
      target: PropTypes.string.isRequired,
    }).isRequired,
    params: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      paymentMethod: PropTypes.string.isRequired,
    }),
  }).isRequired,
  targetElement: PropTypes.object.isRequired,
}

Checkout.defaultProps = {
  theme: {},
  configs: {
    target: '',
  },
  apiValues: {
    configs: {
      image: '',
      theme: 'dark',
    },
  },
}

export default applyThemr(withStatechart(statechart)(Checkout))
