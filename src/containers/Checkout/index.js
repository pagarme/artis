import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
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
import {
  Grid,
  Row,
  Col,
} from 'former-kit'

import { changeScreenSize } from '../../actions'
import strategies from '../../utils/strategies'
import getErrorMessage from '../../utils/data/errorMessages'
import { hasRequiredPageData } from '../../utils/validations'

import {
  ProgressBar,
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
import SwitchPayment from '../../pages/Payment/SwitchPayment'
import CreditCardAndBoletoPage from '../../pages/Payment/CreditCardAndBoleto'
import MultipleCreditCardsPage from '../../pages/Payment/MultipleCreditCards'

import statechart from './statechart'

const stepsTitles = [
  {
    page: 'customer',
    title: 'Identificação',
    visible: true,
  },
  {
    page: 'addresses',
    title: 'Endereços',
    visible: true,
  },
  {
    page: 'payment',
    title: 'Forma de Pagamento',
    visible: true,
  },
  {
    page: 'singleCreditCard',
    visible: false,
  },
  {
    page: 'singleBoleto',
    visible: false,
  },
  {
    page: 'creditCardAndBoleto',
    visible: false,
  },
  {
    page: 'transaction',
    visible: false,
  },
  {
    page: 'confirmation',
    title: 'Confirmação',
    visible: true,
  },
]

const applyThemr = themr('UICheckout')

class Checkout extends Component {
  state = {
    closingEffect: false,
    collapsedCart: true,
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

  handleToggleCart = () => {
    this.setState(({ collapsedCart }) => ({ collapsedCart: !collapsedCart }))
  }

  handlePageTransition = page => () => this.props.transition(page)

  close () {
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
      transaction,
    } = this.props

    const {
      configs = {},
      key,
      token,
      cart,
    } = apiData

    const { amount } = transaction
    const { onTransactionSuccess, onError } = configs
    const items = propOr([], 'items', cart)

    const requestPayload = {
      ...pageInfo,
      items,
      key,
      token,
      amount,
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

  renderPages () {
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
            base={base}
            handleSubmit={this.handleFormSubmit}
          />
        </State>
        <State value="payment">
          <PaymentPage
            base={base}
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
          <SwitchPayment
            base={base}
            defaultMethod={'creditcard'}
            handleSubmit={this.handleFormSubmit}
            paymentType={'creditcard'}
            transaction={transaction}
          />
        </State>
        <State value="singleBoleto">
          <SwitchPayment
            base={base}
            defaultMethod={'boleto'}
            handleSubmit={this.handleFormSubmit}
            paymentType={'boleto'}
            transaction={transaction}
          />
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

  renderCart () {
    const { theme, base, apiData, pageInfo, transaction } = this.props
    const { cart } = apiData
    const { items, shippingRate } = cart
    const { shipping, customer } = pageInfo
    const { amount } = transaction

    return (
      <Col
        tv={3}
        desk={3}
        tablet={3}
        palm={0}
        className={theme.cartWrapper}
      >
        <Cart
          base={base}
          items={items}
          amount={amount}
          shipping={shipping}
          customer={customer}
          shippingRate={shippingRate}
          onToggleCart={this.handleToggleCart}
          collapsed={this.props.isBigScreen ? false : this.state.collapsedCart}
          showCloseButton={this.props.isBigScreen}
        />
      </Col>
    )
  }

  render () {
    const {
      theme,
      apiData,
      machineState,
      isBigScreen,
      base,
    } = this.props

    const { configs, cart } = apiData

    const items = pathOr({}, ['items'], cart)

    const {
      companyName,
      logo,
    } = configs

    const pages = filter(value =>
      !hasRequiredPageData(value.page, this.props), stepsTitles)

    const firstPage = pages[0].page

    const isCartButtonVisible = length(items) ?
      !isBigScreen :
      false

    const checkoutColSize = length(items) ? 9 : 12

    const shouldDisablePrevButton =
      machineState.value === firstPage ||
      machineState.value === 'transaction' ||
      (machineState.value === 'confirmation' && !this.state.transactionError)

    return (
      <div
        className={classNames(
          theme.checkout,
          theme[base],
          {
            [theme.closingEffect]: this.state.closingEffect,
          },
        )}
      >
        <div className={theme.wrapper}>
          <Grid className={theme.page}>
            <Row stretch={isBigScreen}>
              {items.length && this.renderCart()}
              <Col
                tv={checkoutColSize}
                desk={checkoutColSize}
                tablet={checkoutColSize}
                palm={12}
              >
                <Header
                  base={base}
                  logoAlt={companyName}
                  logoSrc={logo}
                  onPrev={this.handleBackButton}
                  onClose={this.close.bind(this)}
                  prevButtonDisabled={shouldDisablePrevButton}
                />
                <div
                  className={theme.content}
                >
                  <ProgressBar
                    base={base}
                    steps={pages}
                    activePage={machineState.value}
                  />
                  {this.renderPages()}
                </div>
                <Footer
                  base={base}
                  onToggleCart={this.handleToggleCart}
                  companyName={companyName}
                  cartButtonVisible={isCartButtonVisible}
                  isBigScreen={isBigScreen}
                />
              </Col>
            </Row>
          </Grid>
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
    cartWrapper: PropTypes.string,
    checkoutWrapper: PropTypes.string,
  }),
  acquirer: PropTypes.string.isRequired,
  apiData: PropTypes.shape({
    token: PropTypes.string,
    key: PropTypes.string.isRequired,
    configs: PropTypes.shape({
      companyName: PropTypes.string,
      image: PropTypes.string,
      themeBase: PropTypes.string,
      primaryColor: PropTypes.string,
      seconryColor: PropTypes.string,
      postback: PropTypes.string,
      onTransactionSuccess: PropTypes.func,
      onError: PropTypes.func,
      onModalClose: PropTypes.func,
    }).isRequired,
    customer: PropTypes.object,
    billing: PropTypes.object,
    shipping: PropTypes.object,
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  transaction: PropTypes.shape(),
  apiErrors: PropTypes.arrayOf(PropTypes.string).isRequired,
  base: PropTypes.string.isRequired,
  changeScreenSize: PropTypes.func.isRequired,
  targetElement: PropTypes.object.isRequired, // eslint-disable-line
  pageInfo: PropTypes.object.isRequired, // eslint-disable-line
  transition: PropTypes.func.isRequired,
  isBigScreen: PropTypes.bool,
  machineState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
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

const mapStateToProps = ({ screenSize, pageInfo, transactionValues }) => ({
  isBigScreen: screenSize.isBigScreen,
  pageInfo,
  transaction: transactionValues,
})

export default connect(mapStateToProps, {
  changeScreenSize,
})(applyThemr(withStatechart(statechart)(Checkout)))
