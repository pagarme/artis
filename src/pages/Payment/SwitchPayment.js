import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from 'react-vanilla-form'
import {
  pipe,
  values,
  keys,
  mapObjIndexed,
  pick,
  merge,
  isEmpty,
  isNil,
  omit,
  pathOr,
  prop,
  reject,
} from 'ramda'
import {
  Button,
  ThemeConsumer,
} from 'former-kit'

import { Switch } from '../../components'

import BoletoForm from './BoletoForm'
import CreditCardForm from './CreditCardForm'

import {
  addPageInfo,
  incrementFinalAmount,
  decrementFinalAmount,
  resetFinalAmount,
} from '../../actions'
import {
  required,
  minLength,
  maxLength,
  isValidDate,
} from '../../utils/validations'

import getInstallments from './../../utils/helpers/getInstallments'
import { applyDiscount } from './../../utils/calculations'

const consumeTheme = ThemeConsumer('UIPaymentPage')

const setPaymentMethod = ({
  defaultMethod,
  paymentConfig,
}) => defaultMethod || keys(paymentConfig)[0]

const createSwitchItems = ({
  theme,
  base,
  transaction,
  amount,
  isBigScreen,
  flipped,
  formData,
  handleFlipCard,
  paymentType,
}) => {
  const { paymentConfig } = transaction
  const { boleto, creditcard } = paymentConfig

  const allowedPaymentOptions = {
    boleto: {
      title: 'Boleto',
      render: () => BoletoForm({
        theme,
        base,
        amount,
        data: boleto,
        showBoletoDetails: true,
      }),
    },
    creditcard: {
      title: 'Cartão de Crédito',
      render: () => CreditCardForm({
        theme,
        base,
        amount,
        data: creditcard,
        showCreditCard: true,
        isBigScreen,
        formData,
        flipped,
        handleFlipCard,
        inputPrefixName: '',
        installmentsIndex: 0,
        installmentInitialValue: creditcard.installments[0].initial.toString(),
        installmentsOptions: getInstallments(amount, creditcard, 0),
      }),
    },
  }

  const makeItem = (value, key) => ({
    id: key,
    name: key,
    value: key,
    title: allowedPaymentOptions[key].title,
    subtitle: value.subtitle,
    content: allowedPaymentOptions[key].render(),
  })

  const makeSwitchItems = pipe(
    mapObjIndexed(makeItem),
    values,
  )

  let choosedPaymentOptions = Object.assign({}, paymentConfig)

  if (paymentType) {
    choosedPaymentOptions = {
      [paymentType]: choosedPaymentOptions[paymentType],
    }
  }

  return makeSwitchItems(choosedPaymentOptions)
}

class SwitchPayment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      clickedPaymentType: null,
      flipped: false,
      formData: pathOr({}, ['payment', 'info'], props),
      formValid: pathOr(false, ['payment', 'formValid'], props),
    }
  }

  handleChangeForm = (formData, errors) => {
    this.setState({
      formData,
      formValid: isEmpty(reject(isNil, errors)),
    })
  }

  handleFlipCard = () => {
    this.setState(previousState => ({
      ...previousState,
      flipped: !previousState.flipped,
    }))
  }

  handleSwitchPayment = (clickedPaymentType) => {
    this.setState({ clickedPaymentType })
  }

  handleFormSubmit = (formData, errors) => {
    const {
      defaultMethod,
      handleDecrementFinalAmount,
      handleIncrementFinalAmount,
      handlePageChange,
      handleResetFinalAmount,
      handleSubmit,
      transaction,
    } = this.props

    handleResetFinalAmount()

    let data = formData

    const { clickedPaymentType } = this.state
    const { paymentConfig, amount } = transaction
    const { creditcard, boleto } = paymentConfig

    const paymentType = clickedPaymentType || setPaymentMethod({
      defaultMethod,
      paymentConfig,
    })

    const method = merge(
      paymentConfig[paymentType],
      { type: paymentType }
    )

    const validatedErrors = omit(paymentType === 'boleto'
      ? ['cardNumber',
        'cvv',
        'expiration',
        'holderName',
        'installments']
      : [], reject(isNil, errors))

    const payment = {
      method,
      formValid: isEmpty(validatedErrors),
      type: paymentType,
    }

    if (paymentType === 'creditcard') {
      payment.info = pick([
        'cardNumber',
        'holderName',
        'cvv',
        'expiration',
        'installments',
      ], data)

      const selectedInstallment = data.installments
      const installmentsList = getInstallments(amount, creditcard, 0)
      const installment = installmentsList.find((elem, index) => (
        index.toString() === selectedInstallment
      ))
      const interest = prop('interest', installment)

      if (interest) {
        handleIncrementFinalAmount(interest)
      }
    }

    if (paymentType === 'boleto') {
      data = { boleto: true }

      const { discount } = boleto
      const type = prop('type', discount)
      const value = prop('value', discount)

      if (type && value) {
        const finalDiscount = amount - applyDiscount(type, value, amount)
        handleDecrementFinalAmount(finalDiscount)
      }
    }

    this.setState({
      formValid: payment.formValid,
    })

    handlePageChange({
      page: 'payment',
      pageInfo: payment,
    })

    handleSubmit(data, validatedErrors)
  }

  render () {
    const {
      amount,
      base,
      defaultMethod,
      isBigScreen,
      paymentType,
      theme,
      transaction,
    } = this.props

    const {
      formData,
      formValid,
      flipped,
      clickedPaymentType,
    } = this.state

    const {
      paymentConfig,
    } = transaction

    let validation = null

    const selectedPaymentType = clickedPaymentType || setPaymentMethod({
      defaultMethod,
      paymentConfig,
    })

    if (selectedPaymentType === 'creditcard') {
      validation = {
        cardNumber: [
          required,
          minLength(16),
          maxLength(16),
        ],
        holderName: [
          required,
          minLength(10),
          maxLength(20),
        ],
        expiration: [
          required,
          minLength(4),
          maxLength(4),
          isValidDate,
        ],
        cvv: [
          required,
          minLength(3),
          maxLength(3),
        ],
        installments: [
          required,
        ],
      }
    }

    return (
      <Form
        data={formData}
        onChange={this.handleChangeForm}
        onSubmit={this.handleFormSubmit}
        customErrorProp="error"
        validation={validation}
      >
        {Switch({
          base,
          theme,
          name: 'paymentOptions',
          selected: selectedPaymentType,
          items: createSwitchItems({
            amount,
            theme,
            base,
            isBigScreen,
            transaction,
            paymentType,
            formData,
            flipped,
            handleFlipCard: this.handleFlipCard,
          }),
          handleSwitchPayment: this.handleSwitchPayment,
        })}
        <div className={theme.footerPadding}>
          <Button
            alignEnd
            className={theme.confirmBtn}
            size="extra-large"
            type="submit"
            disabled={!formValid && selectedPaymentType !== 'boleto'}
          >
            Finalizar compra
          </Button>
        </div>
      </Form>
    )
  }
}

SwitchPayment.propTypes = {
  amount: PropTypes.number.isRequired,
  base: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleIncrementFinalAmount: PropTypes.func.isRequired,
  handleDecrementFinalAmount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isBigScreen: PropTypes.bool.isRequired,
  defaultMethod: PropTypes.string,
  paymentType: PropTypes.string,
  handleResetFinalAmount: PropTypes.func.isRequired,
  theme: PropTypes.shape(),
  transaction: PropTypes.shape().isRequired,
}

SwitchPayment.defaultProps = {
  paymentType: null,
  payment: null,
  defaultMethod: null,
  theme: {},
}

const mapStateToProps = ({ screenSize, pageInfo, transactionValues }) => ({
  isBigScreen: screenSize.isBigScreen,
  payment: pageInfo.payment,
  amount: transactionValues.amount,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
  handleIncrementFinalAmount: incrementFinalAmount,
  handleDecrementFinalAmount: decrementFinalAmount,
  handleResetFinalAmount: resetFinalAmount,
})(consumeTheme(SwitchPayment))
