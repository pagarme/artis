import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import { Action, withStatechart } from 'react-automata'
import { omit, when, always } from 'ramda'

import { changeScreenSize, showFooterButton } from '../../actions'

import { ProgressBar, Header, Footer } from '../../components'

import CustomerPage from '../../pages/Customer'
import BillingPage from '../../pages/Billing'
import ShippingPage from '../../pages/Shipping'
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
      showProgressbar: true,
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

  handleNavigation (transitionTo, pages, steps) {
    this.props.transition(transitionTo, {
      isBigScreen: this.props.isBigScreen,
    })

    const inc = transitionTo === 'NEXT' ? 1 : -1
    const activePage = steps.findIndex(page => (
      page === pages[this.props.machineState]
    )) + inc

    this.setState({ activePage })
    this.props.footerButtonVisible(!(activePage === steps.length - 1))
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

  renderPages () {
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
          <CustomerPage title="Dados Pessoais" />
        </Action>
        <Action show="billing">
          <BillingPage title="Endereço de Cobrança" />
        </Action>
        <Action show="shipping">
          <ShippingPage
            title="Selecione um endereço cadastrado"
          />
        </Action>
        <Action show="payment">
          <PaymentPage
            title="Dados de Pagamento"
            paymentMethods={paymentMethods}
            amount={amount}
          />
        </Action>
        <Action show="confirmation">
          <ConfirmationPage
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

  render () {
    const {
      activePage,
      showProgressbar,
    } = this.state

    const { apiData, theme, isBigScreen, isFooterButtonVisible } = this.props

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
            logoAlt={configs.companyName}
            logoSrc={configs.image || defaultLogo}
            onPrev={
              this.handleNavigation.bind(this, 'PREV', pages, steps)
            }
            onClose={this.close.bind(this)}
            prevButtonDisabled={activePage === 0 || activePage === 3}
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
            companyName={configs.companyName}
            buttonVisible={isFooterButtonVisible}
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
      primaryColor: PropTypes.string,
      seconryColor: PropTypes.string,
      postback: PropTypes.string,
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
  changeScreenSize: PropTypes.func.isRequired,
  targetElement: PropTypes.object.isRequired, // eslint-disable-line
  machineState: PropTypes.string.isRequired,
  transition: PropTypes.func.isRequired,
  isBigScreen: PropTypes.bool.isRequired,
  footerButtonVisible: PropTypes.func.isRequired,
  isFooterButtonVisible: PropTypes.bool.isRequired,
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

const mapStateToProps = ({ screenSize, showFooterButton }) => ({ // eslint-disable-line
  isBigScreen: screenSize.isBigScreen,
  isFooterButtonVisible: showFooterButton,
})

const mapDispatchToProps = dispatch => ({
  footerButtonVisible: isVisible => dispatch(showFooterButton(isVisible)),
  changeScreenSize: payload => dispatch(changeScreenSize(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(applyThemr(withStatechart(statechart)(Checkout)))
