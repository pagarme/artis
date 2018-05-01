import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ThemeConsumer } from 'former-kit'
import { connect } from 'react-redux'
import { State, Action, withStatechart } from 'react-automata'
import ReactGA from 'react-ga'
import {
  isEmpty,
  isNil,
  length,
  reject,
  path,
  pathOr,
  propOr,
  filter,
} from 'ramda'

import { changeScreenSize } from '../../actions'
import strategies from '../../utils/strategies'
import getErrorMessage from '../../utils/data/errorMessages'
import { hasRequiredPageData } from '../../utils/validations'

import {
  Header,
  Footer,
  Cart,
  LoadingInfo,
  ErrorInfo,
  SuccessInfo,
} from '../../components'

import CustomerPage from '../../pages/Customer'
import AddressesPage from '../../pages/Addresses'
import PaymentPage from '../../pages/Payment'
import CreditCardPage from '../../pages/Payment/CreditCard'
import CreditCardAndBoletoPage from '../../pages/Payment/CreditCardAndBoleto'
import MultipleCreditCardsPage from '../../pages/Payment/MultipleCreditCards'

import CloseIcon from '../../images/close.svg'

import statechart from './statechart'
import steps from './steps'

const consumeTheme = ThemeConsumer('UICheckout')

class Checkout extends Component {
  state = {
    closingEffect: false,
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

  componentDidMount () {
    this.props.changeScreenSize(window.innerWidth)
    window.addEventListener('resize', this.handleNewScreenSize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleNewScreenSize)
  }

  onTransactionReturn = ({
    response,
    onTransactionSuccess,
    onError,
  }) => {
    const {
      status,
      boleto_barcode: boletoBarcode,
      boleto_url: boletoUrl,
    } = response

    if (status === 'authorized' || status === 'waiting_payment') {
      let successState = { }

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

    if (onError) {
      onError(response)
    }

    return this.setState({
      transactionError: true,
      ...getErrorMessage(response),
    }, this.props.transition('TRANSACTION_FAILURE'))
  }

  handleNewScreenSize = () => {
    this.props.changeScreenSize(window.innerWidth)
  }

  navigateToPage () {
    const { machineState } = this.props
    const { value, history } = machineState

    if (!hasRequiredPageData(value, this.props)) {
      return
    }

    if (pathOr('', ['value'], history) === 'payment') {
      this.navigatePreviousPage()
      return
    }

    this.navigateNextPage()
  }

  navigatePreviousPage = () => {
    this.props.transition('PREV')
  }

  navigateNextPage = () => {
    this.props.transition('NEXT')
  }

  handleBackButton = () => {
    this.navigatePreviousPage()
  }

  handleFormSubmit = (values, errors) => {
    if (isEmpty(values) || !isEmpty(reject(isNil, errors))) {
      return
    }

    this.navigateNextPage()
  }

  handlePageTransition = page => () => this.props.transition(page)

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

    const { onTransactionSuccess, onError } = configs
    const items = propOr([], 'items', cart)

    const requestPayload = {
      ...pageInfo,
      items,
      key,
      token,
      amount: finalAmount,
    }

    const request = strategies[acquirer]

    request(requestPayload)
      .then((response) => {
        this.onTransactionReturn({
          response,
          onTransactionSuccess,
          onError,
        })
      })
  }

  renderPages (pages) {
    const { base, pageInfo, transaction } = this.props

    const { payment } = pageInfo

    return (
      <React.Fragment>
        <State value="customer">
          <CustomerPage
            base={base}
            handleSubmit={this.handleFormSubmit}
          />
        </State>
        <State value="addresses">
          <AddressesPage
            handlePreviousButton={this.navigatePreviousPage}
            base={base}
            handleSubmit={this.handleFormSubmit}
          />
        </State>
        <State value="payment">
          <PaymentPage
            base={base}
            handlePreviousButton={
              pages[0].page === 'payment'
                ? null
                : this.navigatePreviousPage
            }
            handlePageTransition={this.handlePageTransition}
            handleSubmit={this.handleFormSubmit}
            title="Dados de Pagamento"
            transaction={transaction}
          />
        </State>
        <State value="transaction">
          <LoadingInfo />
        </State>
        <Action show="onTransactionError">
          <ErrorInfo
            base={base}
            title={this.state.errorTitle}
            subtitle={this.state.errorSubtitle}
          />
        </Action>
        <Action show="onTransactionSuccess">
          <SuccessInfo
            base={base}
            paymentInfo={{
              customer: path(['customer', 'name'], pageInfo),
              address: path(['shipping'], pageInfo),
              amount: path(['apiData', 'transaction', 'amount'], this.props),
              installments: path(['info', 'installments'], payment),
            }}
            boletoBarcode={this.state.boletoBarcode}
            boletoUrl={this.state.boletoUrl}
          />
        </Action>
        <State value="singleCreditCard">
          <CreditCardPage
            handlePreviousButton={this.navigatePreviousPage}
            handleSubmit={this.handleFormSubmit}
            transaction={transaction}
          />
        </State>
        <State value="singleBoleto">
          {/* <SwitchPayment
            base={base}
            defaultMethod={'boleto'}
            handleSubmit={this.handleFormSubmit}
            paymentType={'boleto'}
            transaction={transaction}
          /> */}
        </State>
        <State value="creditCardAndBoleto">
          <CreditCardAndBoletoPage
            base={base}
            handleSubmit={this.handleFormSubmit}
            transaction={transaction}
          />
        </State>
        <State value="multipleCreditCards">
          <MultipleCreditCardsPage
            base={base}
            handleSubmit={this.handleFormSubmit}
            transaction={transaction}
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

    const pages = filter(value =>
      !hasRequiredPageData(value.page, this.props), steps
    )

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
            base={base}
            logoAlt={companyName}
            logoSrc={logo}
            steps={pages}
            activeStep={machineState.value}
          />
          <main
            className={theme.content}
          >
            {this.renderPages(pages)}
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
  transaction: PropTypes.shape(),
  apiErrors: PropTypes.arrayOf(PropTypes.string).isRequired,
  apiData: PropTypes.shape().isRequired,
  base: PropTypes.string.isRequired,
  changeScreenSize: PropTypes.func.isRequired,
  targetElement: PropTypes.object.isRequired, // eslint-disable-line
  pageInfo: PropTypes.object.isRequired, // eslint-disable-line
  transition: PropTypes.func.isRequired,
  machineState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  finalAmount: PropTypes.number.isRequired, //eslint-disable-line
}

Checkout.defaultProps = {
  theme: {},
  customer: {},
  shipping: {},
  payment: {},
  apiData: {},
  isBigScreen: false,
  transaction: {},
}

const mapStateToProps = ({ pageInfo, transactionValues }) => ({
  pageInfo,
  transaction: transactionValues,
  finalAmount: transactionValues.finalAmount,
})

export default connect(mapStateToProps, {
  changeScreenSize,
})(consumeTheme(withStatechart(statechart)(Checkout)))
