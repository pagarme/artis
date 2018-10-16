import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { ThemeConsumer } from 'former-kit'
import ReactGA from 'react-ga'

import {
  concat,
  contains,
  length,
  not,
  path,
  pathOr,
  prop,
  reduce,
} from 'ramda'
import {
  ActionButton,
  NavigationBar,
} from '../../components'

import BoletoIcon from '../../components/Svg/Boleto'
import CreditCardIcon from '../../components/Svg/CreditCard'
import TwoCreditCards from '../../images/two-credit-cards.svg'
import CradiCardMoreBoleto from '../../images/credit-card-more-boleto.svg'

import { updateFinalAmount } from '../../redux/actions'

const consumeTheme = ThemeConsumer('UIPaymentOptionsPage')

const allowedOptions = props => [
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
  {
    paymentType: 'creditcard',
    title: 'Cartão de crédito',
    icon: <CreditCardIcon
      width={51}
      height={36}
      viewBox={[51, 36]}
      gradient={{
        initial: props.checkoutColors.primaryColor,
        final: props.checkoutColors.secondaryColor,
      }}
    />,
    transitionTo: 'SINGLE_CREDITCARD',
  },
  {
    paymentType: 'boleto',
    title: 'Boleto',
    icon: <BoletoIcon
      width={51}
      height={36}
      viewBox={[51, 36]}
      gradient={{
        initial: props.checkoutColors.primaryColor,
        final: props.checkoutColors.secondaryColor,
      }}
    />,
    transitionTo: 'SINGLE_BOLETO',
  },
]

class PaymentOptionsPage extends React.Component {
  state = {
    transitionTo: '',
  }

  componentDidMount = () => {
    const {
      callbacks,
      handleUpdateFinalAmount,
      transaction,
    } = this.props

    const amount = path([
      'amount',
    ], transaction)

    const onEnter = prop('onEnter', callbacks)

    if (onEnter) {
      onEnter()
    }

    ReactGA.pageview('/paymentoptions')

    handleUpdateFinalAmount(amount)
  }

  componentWillUnmount () {
    const { callbacks } = this.props
    const onExit = prop('onExit', callbacks)

    if (onExit) {
      onExit()
    }
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
      handlePageTransition,
      handlePreviousButton,
    } = this.props
    const { paymentMethods, paymentConfig } = this.props.transaction

    const methods = length(paymentMethods)
      ? paymentMethods
      : ['creditcard', 'boleto']

    const multipaymentButtons = reduce(
      (buttons, option) => {
        const {
          paymentType,
          title,
          icon,
          transitionTo,
        } = option

        if (not(contains(paymentType, methods))) {
          return buttons
        }

        const key = paymentType.toString()
        const subtitle = pathOr(
          '',
          [paymentType, 'subtitle'],
          paymentConfig
        )

        return concat(
          buttons,
          [
            (
              <ActionButton
                icon={icon}
                key={key}
                subtitle={subtitle}
                onClick={this.handleSelectOption(transitionTo)}
                title={title}
              />
            ),
          ]
        )
      },
      [],
      allowedOptions(this.props)
    )

    return (
      <div className={theme.page}>
        <h2 className={theme.title}>
          Como quer pagar?
        </h2>
        <div className={
          classNames(
            theme.optionsContainer,
            {
              [theme.column]: true,
            }
          )
        }
        >
          { multipaymentButtons }
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
  callbacks: PropTypes.shape({
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
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
  callbacks: {},
}

const mapDispatchToProps = {
  handleUpdateFinalAmount: updateFinalAmount,
}

export default
connect(null, mapDispatchToProps)(consumeTheme(PaymentOptionsPage))
