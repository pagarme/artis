import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import { Action, withStatechart } from 'react-automata'
import { isEmpty } from 'ramda'

import { changeScreenSize, addPageInfo } from '../../actions'

import { ProgressBar, Header, Footer } from '../../components'

import CustomerPage from '../../pages/Customer'
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

  handleNavigation (values, errors) {
    if (isEmpty(values) || !isEmpty(errors)) {
      return
    }

    const activePage = this.state.activePage + 1

    this.props.addPageInfo({
      page: this.props.machineState,
      pageInfo: values,
    })

    this.setState({ activePage })
    this.props.transition('NEXT')
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
          <CustomerPage handleSubmit={this.handleNavigation.bind(this)} />
        </Action>
        <Action show="addresses">
          <ShippingPage
            title="Selecione os endereços para cobrança e entrega"
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
    } = this.state

    const { apiData, theme, isBigScreen } = this.props

    const { params = {}, configs = {} } = apiData

    const isAddressForm = !(this.props.isProgressBarVisible || isBigScreen)

    const { pages } = statechart

    const steps = Object.values(
      pages
    )

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
            prevButtonDisabled={
              activePage === 0 || (
                activePage === steps.length ||
                isAddressForm
              )
            }
          />
          <div
            className={classNames(
              theme.content,
              {
                [theme.darkContent]: isAddressForm,
              },
            )}
          >
            {
              !isAddressForm &&
              <ProgressBar
                steps={steps}
                activePage={activePage}
              />
            }
            {this.renderPages()}
          </div>
          <Footer
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
  isProgressBarVisible: PropTypes.bool.isRequired,
  addPageInfo: PropTypes.func.isRequired,
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

const mapStateToProps = ({ screenSize, showProgressBar }) => ({
  isBigScreen: screenSize.isBigScreen,
  isProgressBarVisible: showProgressBar,
})

export default connect(
  mapStateToProps,
  {
    changeScreenSize,
    addPageInfo,
  }
)(applyThemr(withStatechart(statechart)(Checkout)))
