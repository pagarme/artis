import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ThemeConsumer } from 'former-kit'
import { connect } from 'react-redux'
import { State, withStatechart } from 'react-automata'
import ReactGA from 'react-ga'
import {
  __,
  always,
  and,
  assoc,
  complement,
  dissoc,
  equals,
  filter,
  has,
  head,
  identity,
  ifElse,
  isNil,
  keys,
  length,
  merge,
  not,
  path,
  pathOr,
  pipe,
  prop,
  propOr,
  type,
} from 'ramda'

import {
  addInstallments,
  addPageInfo,
  addTransactionValues,
  updateCardId,
} from '../../actions'
import strategies from '../../utils/strategies'
import getErrorMessage from '../../utils/data/errorMessages'
import {
  hasRequiredPageData,
  isFormValid,
} from '../../utils/validations'
import calcAmount from '../../utils/calculations/calcAmount'

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
    const onError = path([
      'configs',
      'onError',
    ], apiData)

    if (onError && length(apiErrors)) {
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
      creditCard,
      transition,
    } = this.props

    const {
      status,
      boleto_barcode: boletoBarcode,
      boleto_url: boletoUrl,
      errors,
    } = response

    if (isNil(status) && isNil(errors)) {
      if (onReturnPayload) {
        const payload = this.replaceCardhashIfCardIdIsPresent(
          response,
          creditCard
        )
        onReturnPayload(payload)
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
        const payload = this.replaceCardhashIfCardIdIsPresent(
          response,
          creditCard
        )

        onTransactionSuccess(payload)
      }

      return this.setState({
        ...successState,
      }, transition('TRANSACTION_SUCCESS'))
    }

    if (status === 'processing' || status === 'pending_review') {
      return transition('TRANSACTION_ANALYSIS')
    }

    if (onError) {
      onError(response)
    }

    return this.setState({
      transactionError: true,
      ...getErrorMessage(response),
    }, transition('TRANSACTION_FAILURE'))
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

  getInitialData = () => {
    const {
      acquirerName,
      creditCard,
      handleAddInstallments,
    } = this.props
    const acquirer = strategies[acquirerName]
    const apiData = assoc('creditCard', creditCard, this.props.apiData)

    ReactGA.pageview('/loading')
    acquirer.prepare(apiData)
      .then((response) => {
        const [checkoutData, installments] = response

        this.saveAllPageInfos(checkoutData)
        this.saveTransactionValues(checkoutData)
        handleAddInstallments(installments)

        this.navigateNextPage()
      })
  }

  replaceCardhashIfCardIdIsPresent = (response, creditCard) => {
    const addCardId = pipe(
      prop('cardId'),
      assoc('cardId', __, response),
      dissoc('card_hash')
    )

    return ifElse(
      has('cardId'),
      addCardId,
      always(response)
    )(creditCard)
  }

  saveTransactionValues = (checkoutData) => {
    const { handleAddTransactionValues } = this.props
    const { transaction, cart, shipping } = checkoutData

    const amount = calcAmount(cart, shipping, transaction)
    const defaultMethod = prop('defaultMethod', transaction)
    const paymentConfig = prop('paymentConfig', transaction)

    handleAddTransactionValues({
      amount,
      defaultMethod,
      paymentConfig,
    })
  }

  saveAllPageInfos = (checkoutData) => {
    const {
      cart,
      customer,
      billing,
      shipping,
    } = checkoutData
    const { handleAddPageInfo } = this.props

    handleAddPageInfo({
      page: 'cart',
      pageInfo: cart,
    })

    handleAddPageInfo({
      page: 'customer',
      pageInfo: customer,
    })

    handleAddPageInfo({
      page: 'billing',
      pageInfo: billing,
    })

    handleAddPageInfo({
      page: 'shipping',
      pageInfo: shipping,
    })
  }

  navigateToPage () {
    const value = pathOr('', ['machineState', 'value'], this.props)
    const page = getActiveStep(value)

    if (!hasRequiredPageData(page, this.props)) {
      ReactGA.pageview(`/${page}`)
      return
    }

    this.setState({
      steps: filter(pipe(
        prop('page'), complement(equals)(page)
      ), this.state.steps),
    })

    this.navigateNextPage()
  }

  navigateBackToPage () {
    const value = pathOr('', ['machineState', 'value'], this.props)
    const page = getActiveStep(value)

    if (!hasRequiredPageData(page, this.props)) {
      ReactGA.pageview(`/${page}`)
      return
    }

    this.navigatePrevPage()
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

    if (and(
      equals('billing', currentStateValue),
      isFirstPage('addresses')
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

  navigatePrevPage = () => {
    this.props.transition('PREV')
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
      acquirerName,
      pageInfo,
      apiData,
      finalAmount,
    } = this.props

    const cardId = pathOr(null, ['creditCard', 'cardId'], this.props)

    const {
      configs = {},
      key,
      token,
      cart,
    } = apiData

    const {
      postback,
      createTransaction,
      onTransactionSuccess,
      onReturnPayload,
      onError,
    } = configs

    const items = propOr([], 'items', cart)

    const requestPayload = {
      cardId,
      ...pageInfo,
      createTransaction,
      items,
      key,
      token,
      postback,
      amount: finalAmount,
    }

    const { request } = strategies[acquirerName]

    request(requestPayload)
      .then((response) => {
        this.onTransactionReturn({
          response: merge(requestPayload, response),
          onTransactionSuccess,
          onReturnPayload,
          onError,
        })
      })
  }

  saveCreditCard = () => {
    const { creditCard, acquirerName } = this.props
    const key = path(['apiData', 'key'], this.props)

    const payload = assoc('encryption_key', key, creditCard)

    const request = strategies[acquirerName].createCard

    return request(payload)
      .then((response) => {
        this.props.updateCardId(response)
        this.navigateNextPage()
      })
  }

  renderPages () {
    const {
      apiData,
      transaction,
    } = this.props

    const enableCart = pathOr(false, [
      'configs',
      'enableCart',
    ], apiData)

    const allowSaveCreditCard = path([
      'configs',
      'allowSaveCreditCard',
    ], apiData)

    return (
      <React.Fragment>
        <State value="initialData">
          <LoadingInfo
            title="Carregando"
            subtitle="Aguarde..."
          />
        </State>
        <State value="saveCreditCard">
          <LoadingInfo
            title="Salvando seu cartão"
            subtitle="Aguarde..."
          />
        </State>
        <State value="customer">
          <CustomerPage
            enableCart={enableCart}
            handleSubmit={this.handleFormSubmit}
          />
        </State>
        <State value="addresses.billing">
          <BillingPage
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
            handlePageTransition={this.handlePageTransition}
            handlePreviousButton={this.navigatePreviousPage}
            handleSubmit={this.handleFormSubmit}
            saveCreditCard={this.saveCreditCard}
            allowSaveCreditCard={allowSaveCreditCard}
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
      pageInfo,
      finalAmount,
      transaction,
    } = this.props

    const amount = prop('amount', transaction)

    const cart = pathOr({}, ['cart'], apiData)
    const items = pathOr([], ['items'], cart)

    const enableCart = pathOr(false, ['configs', 'enableCart'], apiData)
    const companyName = pathOr('', ['configs', 'companyName'], apiData)
    const logo = pathOr('', ['configs', 'logo'], apiData)

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
  acquirerName: PropTypes.string.isRequired,
  apiData: PropTypes.shape().isRequired,
  apiErrors: PropTypes.arrayOf(PropTypes.string).isRequired,
  creditCard: PropTypes.shape({
    cardId: PropTypes.string,
  }),
  finalAmount: PropTypes.number.isRequired,
  handleAddInstallments: PropTypes.func.isRequired,
  handleAddPageInfo: PropTypes.func.isRequired,
  handleAddTransactionValues: PropTypes.func.isRequired,
  machineState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  pageInfo: PropTypes.object.isRequired, // eslint-disable-line
  targetElement: PropTypes.object.isRequired, // eslint-disable-line
  theme: PropTypes.shape(),
  transaction: PropTypes.shape(),
  transition: PropTypes.func.isRequired,
  updateCardId: PropTypes.func.isRequired,
}

Checkout.defaultProps = {
  creditCard: {},
  theme: {},
  transaction: {},
}

const mapStateToProps = ({ creditCard, pageInfo, transactionValues }) => ({
  creditCard,
  finalAmount: transactionValues.finalAmount,
  pageInfo,
  transaction: transactionValues,
})

export default connect(mapStateToProps, {
  handleAddPageInfo: addPageInfo,
  handleAddTransactionValues: addTransactionValues,
  updateCardId,
  handleAddInstallments: addInstallments,
})(consumeTheme(withStatechart(statechart)(Checkout)))
