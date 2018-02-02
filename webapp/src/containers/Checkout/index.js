/* eslint-disable react/forbid-prop-types, react/prop-types */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { Action, withStatechart } from 'react-automata'
import { omit, when, always } from 'ramda'

import ProgressBar from '../../components/ProgressBar'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import CustomerPage from '../../pages/Customer'
import BillingPage from '../../pages/Billing'
import ShippingPage from '../../pages/Shipping'
import PaymentPage from '../../pages/Payment'
import ConfirmationPage from '../../pages/Confirmation'
import defaultLogo from '../../images/logo_pagarme.png'

import statechart from './statechart'

const bigScreenSize = 640
const applyThemr = themr('UICheckout')

class Checkout extends Component {
  constructor (props) {
    super(props)

    const { formData } = props.apiData

    this.state = {
      activePage: 0,
      showProgressbar: true,
      closingEffect: false,
      isBigScreen: true,
      footerButtonVisible: true,
      checkoutData: {
        ...formData,
      },
    }

    this.handleFooterButton = this.handleFooterButton.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  componentDidMount () {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  updateDimensions () {
    const { isBigScreen } = this.state

    if (window.innerWidth > bigScreenSize && !isBigScreen) {
      this.setState({ isBigScreen: true })
    }

    if (window.innerWidth < bigScreenSize && isBigScreen) {
      this.setState({ isBigScreen: false })
    }
  }

  handleNavigation (transitionTo, pages, steps) {
    this.props.transition(transitionTo, {
      isBigScreen: this.state.isBigScreen,
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

  handlePageChange (pageState, page) {
    this.setState(state => ({
      checkoutData: {
        ...state.checkoutData,
        [page]: {
          ...pageState,
        },
      },
    }))
  }

  renderPages () {
    const { isBigScreen } = this.state
    const {
      customer,
      billing,
      shipping,
    } = this.state.checkoutData

    const {
      amount,
      paymentMethods,
    } = this.props.apiData.transaction

    return (
      <React.Fragment>
        <Action show="customer">
          <CustomerPage
            title="Dados Pessoais"
            isBigScreen={isBigScreen}
            handlePageChange={this.handlePageChange}
            customer={customer}
            billingData={billing}
          />
        </Action>
        <Action show="billing">
          <BillingPage
            title="Endereço de Cobrança"
            handlePageChange={this.handlePageChange}
            billing={billing}
          />
        </Action>
        <Action show="shipping">
          <ShippingPage
            title="Selecione um endereço cadastrado"
            footerButtonVisible={this.handleFooterButton}
            isBigScreen={isBigScreen}
            shipping={shipping}
            handlePageChange={this.handlePageChange}
          />
        </Action>
        <Action show="payment">
          <PaymentPage
            title="Dados de Pagamento"
            isBigScreen={isBigScreen}
            paymentMethods={paymentMethods}
            amount={amount}
            handlePageChange={this.handlePageChange}
          />
        </Action>
        <Action show="confirmation">
          <ConfirmationPage
            title="Confirmação"
            isBigScreen={isBigScreen}
          />
        </Action>
      </React.Fragment>
    )
  }

  render () {
    const {
      activePage,
      footerButtonVisible,
      showProgressbar,
    } = this.state

    const { apiData, theme } = this.props
    const { isBigScreen } = this.state

    const { params = {}, configs = {} } = apiData

    const { pages } = statechart
    const omitOnBigScreen = when(always(isBigScreen), omit(['billing']))

    const steps = Object.values(
      omitOnBigScreen(pages)
    )

    const footerButtonText = this.props.machineState === 'payment'
      ? 'Finalizar compra'
      : 'Confirmar'

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
            {
              (showProgressbar || isBigScreen) &&
              <ProgressBar
                steps={steps}
                activePage={activePage}
              />
            }
            {this.renderPages()}
          </div>
          <Footer
            total={params.amount}
            buttonText={footerButtonText}
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
    darkContent: PropTypes.string,
  }),
  apiData: PropTypes.shape({
    key: PropTypes.string.isRequired,
    configs: PropTypes.shape({
      image: PropTypes.string,
      theme: PropTypes.string,
      target: PropTypes.string,
    }).isRequired,
    params: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      paymentMethods: PropTypes.arrayOf(
        PropTypes.string,
      ).isRequired,
    }),
  }).isRequired,
  targetElement: PropTypes.object.isRequired,
}

Checkout.defaultProps = {
  theme: {},
  apiData: {
    configs: {
      image: '',
      theme: 'dark',
    },
  },
}

export default applyThemr(withStatechart(statechart)(Checkout))
