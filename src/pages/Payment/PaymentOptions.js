import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from 'former-kit'
import {
  concat,
  contains,
  not,
  reduce,
} from 'ramda'
import {
  NavigationBar,
  DarkButton,
} from '../../components'

import BoletoIcon from '../../images/boleto.svg'
import CreditCardIcon from '../../images/credit-card.svg'
import TwoCreditCards from '../../images/two-credit-cards.svg'
import CradiCardMoreBoleto from '../../images/credit-card-more-boleto.svg'

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

  handleSelectOption = option => () => {
    this.setState({
      transitionTo: option,
    })
  }

  render () {
    const {
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
              <DarkButton
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

    const { paymentConfig } = transaction
    const { creditcard, boleto } = paymentConfig

    return (
      <div className={theme.page}>
        <h2 className={theme.title}>
          Como quer pagar?
        </h2>
        <div className={theme.optionsContainer} >
          <DarkButton
            icon={<CreditCardIcon />}
            onClick={this.handleSelectOption('SINGLE_CREDITCARD')}
            subtitle={creditcard.subtitle}
            title="Cartão de cŕedito"
          />
          { multipaymentButtons }
          <DarkButton
            icon={<BoletoIcon />}
            onClick={this.handleSelectOption('SINGLE_BOLETO')}
            subtitle={boleto.subtitle}
            title="Boleto"
          />
        </div>
        <NavigationBar
          handlePreviousButton={handlePreviousButton}
          handleNextButton={handlePageTransition(this.state.transitionTo)}
          formValid={!this.state.transitionTo}
          prevTitle="Ops, voltar"
          nextTitle="Pagar"
        />
      </div>
    )
  }
}

PaymentOptionsPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
  }),
  handlePageTransition: PropTypes.func.isRequired,
  handlePreviousButton: PropTypes.func,
  transaction: PropTypes.shape({
    amount: PropTypes.number,
    defaultMethod: PropTypes.string,
    finalAmount: PropTypes.number,
    paymentConfig: PropTypes.shape({
      creditcard: PropTypes.shape({
        installments: PropTypes.arrayOf(PropTypes.object),
        invoiceDescriptor: PropTypes.string,
      }),
    }),
    paymentMethods: PropTypes.arrayOf(PropTypes.array),
  }).isRequired,
}

PaymentOptionsPage.defaultProps = {
  theme: {},
  handlePreviousButton: null,
}

export default consumeTheme(PaymentOptionsPage)
