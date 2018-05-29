import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ThemeConsumer } from 'former-kit'
import { connect } from 'react-redux'
import { State, withStatechart } from 'react-automata'
import ReactGA from 'react-ga'
import {
  and,
  complement,
  equals,
  filter,
  head,
  identity,
  ifElse,
  isNil,
  keys,
  length,
  not,
  pathOr,
  pipe,
  prop,
  propOr,
  type,
} from 'ramda'

import strategies from '../../utils/strategies'
import getErrorMessage from '../../utils/data/errorMessages'
import {
  hasRequiredPageData,
  isFormValid,
} from '../../utils/validations'

import {
  AnalysisInfo,
  Cart,
  ErrorInfo,
  Footer,
  Header,
  LoadingInfo,
  SuccessInfo,
} from '../../components'

import CustomerPage from '../../pages/Customer'
import BillingPage from '../../pages/Billing'
import ShippingPage from '../../pages/Shipping'
import PaymentOptionsPage from '../../pages/Payment/PaymentOptions'
import CreditCardPage from '../../pages/Payment/CreditCard'
import BoletoPage from '../../pages/Payment/Boleto'

import CloseIcon from '../../images/checkout-close.svg'

import statechart from './statechart'
import steps from './steps'

const consumeTheme = ThemeConsumer('UICheckout')

const getActiveStep = ifElse(
  pipe(type, equals('Object')),
  pipe(keys, head),
  identity,
)

class Checkout extends React.Component {
  state = {
    closingEffect: false,
    steps,
  }

  componentWillMount () {
    const { apiData, apiErrors } = this.props
    const { onError } = apiData.configs || null

    if (length(apiErrors)) {
      onError({
        name: 'API_ERROR',
        message: apiErrors,
      })
      throw new Error(apiErrors)
    }
  }

  onTransactionReturn = ({
    response,
    onTransactionSuccess,
    onReturnPayload,
    onError,
  }) => {
    const {
      status,
      boleto_barcode: boletoBarcode,
      boleto_url: boletoUrl,
      errors,
    } = response

    if (isNil(status) && isNil(errors)) {
      if (onReturnPayload) {
        onReturnPayload(response)
      }

      return this.close()
    }

    if (status === 'authorized' || status === 'waiting_payment') {
      let successState = {}

      if (boletoBarcode || boletoUrl) {
        successState = {
          boletoUrl,
          boletoBarcode,
        }
      }

      if (onTransactionSuccess) {
        onTransactionSuccess(response)
      }

      return this.setState({
        ...successState,
      }, this.props.transition('TRANSACTION_SUCCESS'))
    }

    if (status === 'processing' || status === 'pending_review') {
      return this.props.transition('TRANSACTION_ANALYSIS')
    }

    if (onError) {
      onError(response)
    }

    return this.setState({
      transactionError: true,
      ...getErrorMessage(response),
    }, this.props.transition('TRANSACTION_FAILURE'))
  }

  getProp = (item, props) => {
    if (item === 'orderUrl') {
      return pathOr({}, [
        'apiData',
        'configs',
        'orderUrl',
      ], props)
    }

    if (item === 'finalAmount') {
      return prop('finalAmount', props)
    }

    if (item === 'boletoBarcode') {
      return prop('boletoBarcode', this.state)
    }

    if (item === 'boletoUrl') {
      return prop('boletoUrl', this.state)
    }

    if (item === 'boletoName') {
      return pathOr({}, [
        'apiData',
        'transaction',
        'paymentConfig',
        'boleto',
        'fileName',
      ], props)
    }

    if (item === 'boletoExpiration') {
      return pathOr({}, [
        'apiData',
        'transaction',
        'paymentConfig',
        'boleto',
        'expirationAt',
      ], props)
    }

    if (item === 'creditCardInstallmentsText') {
      return pathOr({}, [
        'pageInfo',
        'payment',
        'info',
        'installmentText',
      ], props)
    }

    return null
  }

  navigateToPage () {
    const value = pathOr('', ['machineState', 'value'], this.props)

    const page = getActiveStep(value)
    if (!hasRequiredPageData(page, this.props)) {
      return
    }

    this.setState({
      steps: filter(pipe(
        prop('page'), complement(equals)(page)
      ), this.state.steps),
    })

    this.navigateNextPage()
  }

  handlePageTransition = page => () => this.props.transition(page)

  navigatePreviousPage = () => {
    const value = pathOr('', ['machineState', 'value'], this.props)

    const isFirstPage = equals(
      pipe(
        head,
        prop('page'),
      )(this.state.steps)
    )

    if (isFirstPage(value)) {
      return false
    }

    const currentStateKey = head(Object.keys(value))
    const currentStateValue = head(Object.values(value))

    if (and(
      equals(currentStateKey, 'confirmation'),
      complement(equals)(currentStateValue, 'failure')
    )) {
      return false
    }

    if (and(
      isFirstPage('payment'),
      and(
        equals(currentStateKey, 'payment'),
        equals(currentStateValue, 'selection')
      )
    )) {
      return false
    }

    if (equals('shipping', currentStateValue)) {
      return () => this.props.transition('BILLING')
    }

    if (and(
      equals('payment', currentStateKey),
      complement(equals)('selection', currentStateValue),
    )) {
      return () => this.props.transition('SELECTION')
    }

    return () => this.props.transition('PREV')
  }

  navigateNextPage = () => {
    this.props.transition('NEXT')
  }

  handleFormSubmit = (values, errors) => {
    if (not(isFormValid(errors))) {
      return
    }

    this.navigateNextPage()
  }

  handleBillingFormSubmit = (values, errors) => {
    if (not(isFormValid(errors))) {
      return
    }

    const { sameAddressForShipping } = values

    if (sameAddressForShipping) {
      this.props.transition('NEXT')
    }

    if (!sameAddressForShipping) {
      this.props.transition('SHIPPING')
    }
  }

  close = () => {
    const { targetElement } = this.props

    ReactGA.event({
      category: 'Header',
      action: 'Click - Close Button',
    })

    this.setState({ closingEffect: true })

    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(
        targetElement
      )
    }, 500)
  }

  enterLoading = () => {
    const {
      acquirer,
      pageInfo,
      apiData,
      finalAmount,
    } = this.props

    const {
      configs = {},
      key,
      token,
      cart,
    } = apiData

    const {
      createTransaction,
      onTransactionSuccess,
      onReturnPayload,
      onError,
    } = configs
    const items = propOr([], 'items', cart)

    const requestPayload = {
      ...pageInfo,
      createTransaction,
      items,
      key,
      token,
      amount: finalAmount,
    }

    const request = strategies[acquirer].request

    request(requestPayload)
      .then((response) => {
        this.onTransactionReturn({
          response,
          onTransactionSuccess,
          onReturnPayload,
          onError,
        })
      })
  }

  renderPages () {
    const {
      apiData,
      installments,
      transaction,
    } = this.props

    const {
      configs,
    } = apiData

    const { enableCart } = configs

    return (
      <React.Fragment>
        <State value="customer">
          <CustomerPage
            enableCart={enableCart}
            handleSubmit={this.handleFormSubmit}
          />
        </State>
        <State value="addresses.billing">
          <BillingPage
            allowSwitchChooseSameAddress={
              true || !hasRequiredPageData(
                'shipping',
                this.props
              )
            }
            handlePreviousButton={this.navigatePreviousPage}
            enableCart={enableCart}
            handleSubmit={this.handleBillingFormSubmit}
          />
        </State>
        <State value="addresses.shipping">
          <ShippingPage
            enableCart={enableCart}
            handlePreviousButton={this.navigatePreviousPage}
            handleSubmit={this.handleFormSubmit}
          />
        </State>
        <State value="payment.selection">
          <PaymentOptionsPage
            enableCart={enableCart}
            handlePreviousButton={this.navigatePreviousPage}
            handlePageTransition={this.handlePageTransition}
            transaction={transaction}
          />
        </State>
        <State value="payment.singleCreditCard">
          <CreditCardPage
            enableCart={enableCart}
            handlePreviousButton={this.navigatePreviousPage}
            handleSubmit={this.handleFormSubmit}
            installments={installments}
            transaction={transaction}
          />
        </State>
        <State value="payment.singleBoleto">
          <BoletoPage
            enableCart={enableCart}
            handlePreviousButton={this.navigatePreviousPage}
            handleSubmit={this.handleFormSubmit}
            transaction={transaction}
          />
        </State>

        <State value="confirmation.transaction">
          <LoadingInfo
            subtitle="Aguenta firme, é rapidinho"
            title="Processando sua compra"
          />
        </State>
        <State value="confirmation.failure">
          <ErrorInfo
            navigatePreviousPage={this.navigatePreviousPage}
          />
        </State>
        <State value="confirmation.analysis">
          <AnalysisInfo
            closeCheckout={this.close}
          />
        </State>
        <State value="confirmation.success">
          <SuccessInfo
            amount={this.getProp('finalAmount', this.props)}
            boleto={{
              barcode: this.getProp('boletoBarcode', this.props),
              url: this.getProp('boletoUrl', this.props),
              name: this.getProp('boletoName', this.props),
              expirationAt: this.getProp('boletoExpiration', this.props),
            }}
            closeCheckout={this.close}
            creditCard={{
              installmentText: this.getProp(
                'creditCardInstallmentsText',
                this.props
              ),
            }}
            orderUrl={this.getProp('orderUrl', this.props)}
          />
        </State>
      </React.Fragment>
    )
  }

  render () {
    const {
      theme,
      apiData,
      machineState,
      base,
      pageInfo,
      finalAmount,
    } = this.props

    const {
      transaction,
      configs,
      cart,
    } = apiData

    const items = pathOr([], ['items'], cart)
    const { enableCart, companyName, logo } = configs
    const { amount } = transaction
    const { shipping, customer } = pageInfo

    return (
      <div
        className={classNames(
          theme.wrapper,
          {
            [theme.closingEffect]: this.state.closingEffect,
          },
        )}
      >
        <CloseIcon
          className={theme.closeButton}
          onClick={this.close}
        />
        {
          enableCart &&
          <Cart
            base={base}
            items={items}
            amount={{
              initial: amount,
              final: finalAmount,
            }}
            shipping={shipping}
            customer={customer}
            onToggleCart={this.handleToggleCart}
          />
        }
        <div className={theme.checkout}>
          <Header
            activeStep={getActiveStep(machineState.value)}
            handleCloseButton={this.close}
            handlePreviousButton={this.navigatePreviousPage}
            logoAlt={companyName}
            logoSrc={logo}
            steps={this.state.steps}
          />
          <main
            className={theme.content}
          >
            {this.renderPages()}
          </main>
          <Footer />
        </div>
      </div>
    )
  }
}

Checkout.propTypes = {
  theme: PropTypes.shape(),
  acquirer: PropTypes.string.isRequired,
  apiData: PropTypes.shape().isRequired,
  apiErrors: PropTypes.arrayOf(PropTypes.string).isRequired,
  base: PropTypes.string.isRequired,
  finalAmount: PropTypes.number.isRequired, //eslint-disable-line
  installments: PropTypes.arrayOf(PropTypes.object).isRequired,
  machineState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  pageInfo: PropTypes.object.isRequired, // eslint-disable-line
  targetElement: PropTypes.object.isRequired, // eslint-disable-line
  transaction: PropTypes.shape(),
  transition: PropTypes.func.isRequired,
}

Checkout.defaultProps = {
  apiData: {},
  customer: {},
  payment: {},
  shipping: {},
  theme: {},
  transaction: {},
}

const mapStateToProps = ({ pageInfo, transactionValues }) => ({
  finalAmount: transactionValues.finalAmount,
  pageInfo,
  transaction: transactionValues,
})

export default connect(mapStateToProps)(
  consumeTheme(withStatechart(statechart)(Checkout))
)
