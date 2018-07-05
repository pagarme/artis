import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { ThemeConsumer } from 'former-kit'
import {
  concat,
  contains,
  length,
  not,
  path,
  pathOr,
  reduce,
} from 'ramda'
import {
  ActionButton,
  NavigationBar,
} from '../../components'

import BoletoIcon from '../../images/boleto.svg'
import CreditCardIcon from '../../images/credit-card.svg'
import TwoCreditCards from '../../images/two-credit-cards.svg'
import CradiCardMoreBoleto from '../../images/credit-card-more-boleto.svg'

import { updateFinalAmount } from '../../actions'

const consumeTheme = ThemeConsumer('UIPaymentOptionsPage')

const allowedOptions = [
  {
    paymentType: ['creditcard', 'creditcard'],
    title: '2 Cartões',
    icon: <TwoCreditCards />,
    transitionTo: 'MULTIPLE_CREDITCARDS',
  },
  {
    paymentType: ['creditcard', 'boleto'],
    title: 'Cartão + Boleto',
    icon: <CradiCardMoreBoleto />,
    transitionTo: 'CREDITCARD_AND_BOLETO',
  },
]

class PaymentOptionsPage extends React.Component {
  state = {
    transitionTo: '',
  }

  componentDidMount = () => {
    const {
      handleUpdateFinalAmount,
      transaction,
    } = this.props

    const amount = path([
      'amount',
    ], transaction)

    handleUpdateFinalAmount(amount)
  }
  handleSelectOption = option => () => {
    this.setState({
      transitionTo: option,
    })
  }

  render () {
    const {
      enableCart,
      theme,
      transaction,
      handlePageTransition,
      handlePreviousButton,
    } = this.props
    const { paymentMethods } = this.props.transaction

    const multipaymentButtons = reduce(
      (buttons, option) => {
        const {
          paymentType,
          title,
          icon,
          transitionTo,
        } = option

        if (not(contains(paymentType, paymentMethods))) {
          return buttons
        }

        const key = paymentType.toString()

        return concat(
          buttons,
          [
            (
              <ActionButton
                icon={icon}
                key={key}
                onClick={this.handleSelectOption(transitionTo)}
                title={title}
              />
            ),
          ]
        )
      },
      [],
      allowedOptions
    )

    const creditcard = pathOr({}, ['paymentConfig', 'creditcard'], transaction)
    const boleto = pathOr({}, ['paymentConfig', 'boleto'], transaction)

    return (
      <div className={theme.page}>
        <h2 className={theme.title}>
          Como quer pagar?
        </h2>
        <div className={classNames(theme.optionsContainer,
          {
            [theme.column]: length(multipaymentButtons) === 0,
          })}
        >
          <ActionButton
            icon={<CreditCardIcon />}
            onClick={this.handleSelectOption('SINGLE_CREDITCARD')}
            subtitle={creditcard.subtitle}
            title="Cartão de crédito"
          />
          { multipaymentButtons }
          <ActionButton
            icon={<BoletoIcon />}
            onClick={this.handleSelectOption('SINGLE_BOLETO')}
            subtitle={boleto.subtitle}
            title="Boleto"
          />
        </div>
        <footer className={theme.footer}>
          <NavigationBar
            enableCart={enableCart}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={handlePageTransition(this.state.transitionTo)}
            formValid={!this.state.transitionTo}
            prevTitle="Ops, voltar"
            nextTitle="Pagar"
          />
        </footer>
      </div>
    )
  }
}

PaymentOptionsPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
  }),
  enableCart: PropTypes.bool,
  handlePageTransition: PropTypes.func.isRequired,
  handlePreviousButton: PropTypes.func,
  handleUpdateFinalAmount: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    amount: PropTypes.number,
    defaultMethod: PropTypes.string,
    finalAmount: PropTypes.number,
    paymentConfig: PropTypes.shape({
      creditcard: PropTypes.shape({
        installments: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        invoiceDescriptor: PropTypes.string,
      }),
    }),
    paymentMethods: PropTypes.arrayOf(PropTypes.array),
  }).isRequired,
}

PaymentOptionsPage.defaultProps = {
  theme: {},
  handlePreviousButton: null,
  enableCart: false,
}

const mapDispatchToProps = {
  handleUpdateFinalAmount: updateFinalAmount,
}

export default
connect(null, mapDispatchToProps)(consumeTheme(PaymentOptionsPage))
