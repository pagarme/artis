import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  ThemeConsumer,
} from 'former-kit'
import {
  concat,
  contains,
  not,
  reduce,
} from 'ramda'

import { DarkButton } from '../../components'
import BoletoIcon from '../../images/boleto.svg'
import CreditCardIcon from '../../images/credit-card.svg'
import TwoCreditCards from '../../images/two-credit-cards.svg'
import CradiCardMoreBoleto from '../../images/credit-card-more-boleto.svg'
import NavigateBack from '../../images/navigate_back.svg'
import NavigateNext from '../../images/navigate_next.svg'

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
                key={key}
                onClick={this.handleSelectOption(transitionTo)}
                title={title}
                icon={icon}
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
            title="Cartão de cŕedito"
            subtitle={creditcard.subtitle}
            icon={<CreditCardIcon />}
          />
          { multipaymentButtons }
          <DarkButton
            title="Boleto"
            subtitle={boleto.subtitle}
            icon={<BoletoIcon />}
          />
        </div>
        <div className={theme.buttonContainer}>
          {
            handlePreviousButton ?
              <Button
                fill="outline"
                onClick={handlePreviousButton}
                icon={<NavigateBack />}
              >
                  Ops, Voltar
              </Button> :
              <div />
          }
          <Button
            type="submit"
            iconAlignment="end"
            icon={<NavigateNext />}
            disabled={!this.state.transitionTo}
            onClick={handlePageTransition(this.state.transitionTo)}
          >
            Pagar
          </Button>
        </div>
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
