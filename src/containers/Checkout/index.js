import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import { Action, withStatechart } from 'react-automata'
import { isEmpty, isNil, reject } from 'ramda'
import ReactGA from 'react-ga'

import { changeScreenSize } from '../../actions'

import { ProgressBar, Header, Footer, Cart } from '../../components'

import CustomerPage from '../../pages/Customer'
import AddressesPage from '../../pages/Addresses'
import PaymentPage from '../../pages/Payment'
import ConfirmationPage from '../../pages/Confirmation'
import defaultLogo from '../../images/logo_pagarme.png'
import statechart from './statechart'

const applyThemr = themr('UICheckout')

class Checkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activePage: 0,
      closingEffect: false,
    }
  }

  componentDidMount () {
    this.props.changeScreenSize(window.innerWidth)
    window.addEventListener('resize',
      () => this.props.changeScreenSize(window.innerWidth))
  }

  componentWillUnmount () {
    window.addEventListener('resize',
      () => this.props.changeScreenSize(window.innerWidth))
  }

  handleBackButton = () => {
    const activePage = this.state.activePage - 1

    this.setState({ activePage })
    this.props.transition('PREV')
  }

  handleFormSubmit = (values, errors) => {
    if (isEmpty(values) || !isEmpty(reject(isNil, errors))) {
      return
    }

    const activePage = this.state.activePage + 1

    this.setState({ activePage })
    this.props.transition('NEXT')
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

  renderPages (base) {
    const { key, formData, transaction, configs } = this.props.apiData

    const { items } = formData

    const {
      amount,
      paymentMethods,
    } = transaction

    const {
      postback,
    } = configs

    return (
      <React.Fragment>
        <Action show="customer">
          <CustomerPage
            base={base}
            handleSubmit={this.handleFormSubmit}
          />
        </Action>
        <Action show="addresses">
          <AddressesPage
            base={base}
            handleSubmit={this.handleFormSubmit}
          />
        </Action>
        <Action show="payment">
          <PaymentPage
            base={base}
            title="Dados de Pagamento"
            paymentMethods={paymentMethods}
            amount={amount}
            handleSubmit={this.handleFormSubmit}
          />
        </Action>
        <Action show="confirmation">
          <ConfirmationPage
            base={base}
            title="Confirmação"
            amount={amount}
            publickey={key}
            postback={postback}
            items={items}
          />
        </Action>
      </React.Fragment>
    )
  }

  renderCart () {
    const { formData, transaction, configs } = this.props.apiData

    const { items } = formData
    const { enableCart } = configs

    const {
      amount,
    } = transaction

    return enableCart && <Cart items={items} amount={amount} />
  }

  render () {
    const {
      activePage,
    } = this.state

    const { apiData, theme, base } = this.props

    const { params = {}, configs = {} } = apiData

    const { pages } = statechart

    const steps = Object.values(
      pages
    )

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
        { this.renderCart() }
        <div className={theme.wrapper}>
          <Header
            base={base}
            logoAlt={configs.companyName}
            logoSrc={configs.image || defaultLogo}
            onPrev={this.handleBackButton}
            onClose={this.close.bind(this)}
            prevButtonDisabled={
              activePage === 0 || (
                activePage === steps.length
              )
            }
          />
          <div
            className={classNames(
              theme.content,
            )}
          >
            <ProgressBar
              base={base}
              steps={steps}
              activePage={activePage}
            />
            {this.renderPages(base)}
          </div>
          <Footer
            base={base}
            total={params.amount}
            companyName={configs.companyName}
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
      curtomer: PropTypes.object,
      billing: PropTypes.object,
      shipping: PropTypes.object,
      items: PropTypes.arrayOf(PropTypes.object),
    }),
    transaction: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      paymentMethods: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  base: PropTypes.string,
  changeScreenSize: PropTypes.func.isRequired,
  targetElement: PropTypes.object.isRequired, // eslint-disable-line
  transition: PropTypes.func.isRequired,
}

Checkout.defaultProps = {
  theme: {},
  apiData: {
    configs: {
      image: '',
    },
  },
  base: 'dark',
}

export default connect(
  null,
  {
    changeScreenSize,
  }
)(applyThemr(withStatechart(statechart)(Checkout)))
