import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  ThemeConsumer,
} from 'former-kit'
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
} from 'ramda'

import {
  NavigationBar,
} from '../../components'
import {
  addPageInfo,
  updateFinalAmount,
} from '../../actions'
import {
  formatToBRL,
} from './../../utils/masks/'
import BoletoDark from '../../../src/images/boleto-dark.svg'

const consumeTheme = ThemeConsumer('UIBoletoPage')

class Boleto extends React.PureComponent {
  componentDidMount = () => {
    const {
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

    if (discountValue) {
      handleUpdateFinalAmount(amount - finalDiscount)
    }
  }

  getSubtitle =(
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
        <main className={theme.content}>
          <BoletoDark className={theme.icon} />
          <h3 className={theme.amountTitle}>
            {this.getValueToPayText(transaction)}
          </h3>
          <span className={theme.amount}>{formatToBRL(finalAmount)}</span>
          <p className={theme.warning}>
            Ao continuar, seu boleto bancário será criado para
            que você faça o pagamento</p>
        </main>
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
