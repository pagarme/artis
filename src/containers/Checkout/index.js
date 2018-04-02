import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import { State, withStatechart } from 'react-automata'
import {
  isEmpty,
  isNil,
  reject,
  pathOr,
  has,
  allPass,
  filter,
} from 'ramda'
import ReactGA from 'react-ga'

import { changeScreenSize } from '../../actions'

import { ProgressBar, Header, Footer, Cart } from '../../components'
import { Grid, Row, Col } from '../../components/Grid'

import CustomerPage from '../../pages/Customer'
import AddressesPage from '../../pages/Addresses'
import PaymentPage from '../../pages/Payment'
import SwitchPayment from '../../pages/Payment/SwitchPayment'
import ConfirmationPage from '../../pages/Confirmation'
import CreditCardAndBoletoPage from '../../pages/Payment/CreditCardAndBoleto'
import MultipleCreditCardsPage from '../../pages/Payment/MultipleCreditCards'

import defaultLogo from '../../images/logo_pagarme.png'
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
    page: 'confirmation',
    title: 'Confirmação',
    visible: true,
  },
]

const applyThemr = themr('UICheckout')

class Checkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      closingEffect: false,
      collapsedCart: true,
    }

    this.handlePageTransition = this.handlePageTransition.bind(this)
  }

  componentDidMount () {
    this.props.changeScreenSize(window.innerWidth)
    window.addEventListener('resize', this.handleNewScreenSize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleNewScreenSize)
  }

  handleNewScreenSize = () => {
    this.props.changeScreenSize(window.innerWidth)
  }

  navigateToPage () {
    const { machineState } = this.props
    const { value, history } = machineState

    if (!this.hasRequiredData(value)) {
      return
    }

    if (pathOr('', ['value'], history) === 'payment') {
      this.navigatePreviousPage()
      return
    }

    this.navigateNextPage()
  }

  hasRequiredData = (page) => {
    if (page === 'customer') {
      const customer = pathOr({}, ['apiData', 'formData', 'customer'], this.props)

      const customerHasAllProps = allPass([
        has('name'),
        has('documentNumber'),
        has('email'),
        has('phoneNumber'),
      ])

      return customerHasAllProps(customer)
    }

    if (page === 'addresses') {
      const billing = pathOr({}, ['apiData', 'formData', 'billing'], this.props)
      const shipping = pathOr({}, ['apiData', 'formData', 'shipping'], this.props)

      const addressHasAllProps = allPass([
        has('street'),
        has('number'),
        has('neighborhood'),
        has('city'),
        has('state'),
        has('zipcode'),
      ])

      return addressHasAllProps(billing) && addressHasAllProps(shipping)
    }

    return false
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

  handlePageTransition (page) {
    return () => {
      this.props.transition(page)
    }
  }

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

  renderPages () {
    const { key, formData, transaction, configs } = this.props.apiData
    const { base } = this.props

    const { items } = formData

    const {
      amount,
    } = transaction

    const {
      postback,
      onSuccess,
      onError,
    } = configs

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
            title="Dados de Pagamento"
            transaction={transaction}
            handleSubmit={this.handleFormSubmit}
            handlePageTransition={this.handlePageTransition}
          />
        </State>
        <State value="confirmation">
          <ConfirmationPage
            base={base}
            title="Confirmação"
            amount={amount}
            publickey={key}
            postback={postback}
            onSuccess={onSuccess}
            onError={onError}
            items={items}
          />
        </State>
        <State value="singleCreditCard">
          <SwitchPayment
            transaction={transaction}
            paymentType={'creditcard'}
            handleSubmit={this.handleFormSubmit}
          />
        </State>
        <State value="singleBoleto">
          <SwitchPayment
            transaction={transaction}
            paymentType={'boleto'}
            handleSubmit={this.handleFormSubmit}
          />
        </State>
        <State value="creditCardAndBoleto">
          <CreditCardAndBoletoPage
            transaction={transaction}
            handleSubmit={this.handleFormSubmit}
          />
        </State>
        <State value="multipleCreditCards">
          <MultipleCreditCardsPage
            transaction={transaction}
            handleSubmit={this.handleFormSubmit}
          />
        </State>
      </React.Fragment>
    )
  }

  renderCart () {
    const { formData, transaction, configs } = this.props.apiData

    const { items } = formData
    const { enableCart, freightValue } = configs
    const { amount } = transaction
    const { theme, base, shipping, customer } = this.props

    return enableCart && (
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
          freight={freightValue}
          onToggleCart={this.handleToggleCart}
          collapsed={this.props.isBigScreen ? false : this.state.collapsedCart}
          showCloseButton={this.props.isBigScreen}
        />
      </Col>
    )
  }

  render () {
    const { theme, machineState, isBigScreen, base } = this.props

    const params = pathOr({}, ['apiData', 'params'], this.props)
    const configs = pathOr({}, ['apiData', 'configs'], this.props)

    const pages = filter(value => !this.hasRequiredData(value.page), stepsTitles)

    const stepsKeys = Object.keys(pages)

    const isCartButtonVisible = configs.enableCart ?
      !this.props.isBigScreen :
      false

    const checkoutColSize = configs.enableCart ? 9 : 12

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
              {this.renderCart()}
              <Col
                tv={checkoutColSize}
                desk={checkoutColSize}
                tablet={checkoutColSize}
                palm={12}
              >
                <Header
                  base={base}
                  logoAlt={configs.companyName}
                  logoSrc={configs.image || defaultLogo}
                  onPrev={this.handleBackButton}
                  onClose={this.close.bind(this)}
                  prevButtonDisabled={
                    machineState.value === stepsKeys[0] ||
                    (machineState.value === 'confirmation' && (this.props.confirmation.loading || this.props.confirmation.success))
                  }
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
                  total={params.amount}
                  onToggleCart={this.handleToggleCart}
                  companyName={configs.companyName}
                  cartButtonVisible={isCartButtonVisible}
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
  apiData: PropTypes.shape({
    key: PropTypes.string.isRequired,
    configs: PropTypes.shape({
      companyName: PropTypes.string,
      image: PropTypes.string,
      themeBase: PropTypes.string,
      primaryColor: PropTypes.string,
      seconryColor: PropTypes.string,
      postback: PropTypes.string,
      enableCart: PropTypes.bool,
      onSuccess: PropTypes.func,
      onError: PropTypes.func,
      onClose: PropTypes.func,
    }).isRequired,
    formData: PropTypes.shape({
      customer: PropTypes.object,
      billing: PropTypes.object,
      shipping: PropTypes.object,
      items: PropTypes.arrayOf(PropTypes.object),
    }),
    transaction: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      paymentMethods: PropTypes.shape(),
    }),
  }).isRequired,
  base: PropTypes.string,
  changeScreenSize: PropTypes.func.isRequired,
  targetElement: PropTypes.object.isRequired, // eslint-disable-line
  transition: PropTypes.func.isRequired,
  shipping: PropTypes.object.isRequired, // eslint-disable-line
  customer: PropTypes.object.isRequired, // eslint-disable-line
  isBigScreen: PropTypes.bool,
  confirmation: PropTypes.shape({
    success: PropTypes.bool,
    loading: PropTypes.bool,
  }),
  machineState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
}

Checkout.defaultProps = {
  theme: {},
  apiData: {
    configs: {
      image: '',
    },
  },
  base: 'dark',
  isBigScreen: false,
  confirmation: {
    success: false,
    loading: true,
  },
}

const mapStateToProps = ({ screenSize, pageInfo }) => ({
  isBigScreen: screenSize.isBigScreen,
  confirmation: pageInfo.confirmation,
  shipping: pageInfo.shipping,
  customer: pageInfo.customer,
})

export default connect(
  mapStateToProps,
  {
    changeScreenSize,
  }
)(applyThemr(withStatechart(statechart)(Checkout)))
