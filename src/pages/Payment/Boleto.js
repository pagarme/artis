import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactGA from 'react-ga'

import {
  __,
  always,
  assoc,
  divide,
  equals,
  identity,
  ifElse,
  isNil,
  multiply,
  path,
  pipe,
  prop,
} from 'ramda'

import ThemeConsumer from '../../former-kit/ThemeConsumer'
import { NavigationBar } from '../../components'
import {
  addPageInfo,
  updateFinalAmount,
} from '../../redux/actions'
import { formatToBRL } from './../../utils/masks/'
import BoletoIcon from '../../components/Svg/Boleto'

const consumeTheme = ThemeConsumer('UIBoletoPage')

class Boleto extends React.PureComponent {
  componentDidMount = () => {
    const {
      callbacks,
      handleUpdateFinalAmount,
      transaction,
    } = this.props

    const amount = path([
      'amount',
    ], transaction)

    const discountType = path([
      'paymentConfig',
      'boleto',
      'discount',
      'type',
    ], transaction)

    const discountValue = path([
      'paymentConfig',
      'boleto',
      'discount',
      'value',
    ], transaction)

    const calculatePercentage = pipe(
      divide(__, 100),
      multiply(amount)
    )

    const getFinalDiscount = ifElse(
      equals('percentage'),
      always(calculatePercentage),
      always(identity),
    )

    const finalDiscount = getFinalDiscount(discountType)(discountValue)

    const onEnter = prop('onEnter', callbacks)

    if (onEnter) {
      onEnter()
    }

    ReactGA.pageview('/boleto')

    if (discountValue) {
      handleUpdateFinalAmount(amount - finalDiscount)
    }
  }

  componentWillUnmount () {
    const { callbacks } = this.props
    const onExit = prop('onExit', callbacks)

    if (onExit) {
      onExit()
    }
  }

  getSubtitle = (
    path([
      'paymentConfig',
      'boleto',
      'subtitle',
    ])
  )

  getValueToPayText = ifElse(
    pipe(
      path([
        'paymentConfig',
        'boleto',
        'discount',
        'value',
      ]),
      isNil,
    ),
    always('Valor a pagar'),
    always('Valor com desconto')
  )

  handleClick = () => {
    const errors = {}
    const paymentConfig = path(['transaction', 'paymentConfig'], this.props)
    const values = { boleto: true }
    const type = 'boleto'

    const method = assoc(
      'type',
      type,
      paymentConfig.boleto,
    )

    const payment = {
      method,
      type,
      info: {},
    }

    this.props.handlePageChange({
      page: 'payment',
      pageInfo: payment,
    })

    this.props.handleSubmit(values, errors)
  }

  render () {
    const {
      enableCart,
      finalAmount,
      handlePreviousButton,
      theme,
      transaction,
    } = this.props
    const subtitle = this.getSubtitle(transaction)

    return (
      <section className={theme.wrapper}>
        <header className={theme.header}>
          <h1 className={theme.title}>Boleto bancário</h1>
          {
            subtitle &&
            <h2 className={theme.subtitle}>{ subtitle }</h2>
          }
        </header>
        <div className={theme.content}>
          <BoletoIcon
            width={126}
            height={90}
            viewBox={[50, 40]}
            fill={this.props.checkoutColors.textColor}
            gradient={{
              initial: this.props.checkoutColors.primaryColor,
              final: this.props.checkoutColors.secondaryColor,
            }}
            className={theme.icon}
          />
          <h3 className={theme.amountTitle}>
            {this.getValueToPayText(transaction)}
          </h3>
          <span className={theme.amount}>{formatToBRL(finalAmount)}</span>
          <p className={theme.warning}>
            Ao continuar, seu boleto bancário será criado para
            que você faça o pagamento
          </p>
        </div>
        <footer className={theme.footer}>
          <NavigationBar
            enableCart={enableCart}
            handlePreviousButton={handlePreviousButton}
            handleNextButton={this.handleClick}
            prevTitle="Ops, voltar"
            nextTitle={`Pagar ${formatToBRL(finalAmount)}`}
          />
        </footer>
      </section>
    )
  }
}


Boleto.propTypes = {
  theme: PropTypes.shape({
    amount: PropTypes.string,
    amountTitle: PropTypes.string,
    content: PropTypes.string,
    footer: PropTypes.string,
    header: PropTypes.string,
    icon: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    warning: PropTypes.string,
    wrapper: PropTypes.string,
  }).isRequired,
  checkoutColors: PropTypes.shape().isRequired,
  callbacks: PropTypes.shape({
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
  }),
  enableCart: PropTypes.bool,
  finalAmount: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handlePreviousButton: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUpdateFinalAmount: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    amount: PropTypes.number,
    paymentConfig: PropTypes.shape({
      boleto: PropTypes.shape({
        subtitle: PropTypes.string,
        discount: PropTypes.shape({
          type: PropTypes.string,
          value: PropTypes.number,
        }),
      }),
    }),
    paymentMethods: PropTypes.arrayOf(PropTypes.array),
  }).isRequired,
}

Boleto.defaultProps = {
  enableCart: false,
  callbacks: {},
}

const mapStateToProps = ({ transactionValues }) => ({
  finalAmount: transactionValues.finalAmount,
})

const mapDispatchToProps = {
  handleUpdateFinalAmount: updateFinalAmount,
  handlePageChange: addPageInfo,
}

export default
connect(mapStateToProps, mapDispatchToProps)(consumeTheme(Boleto))
