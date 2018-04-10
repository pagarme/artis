import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { themr } from 'react-css-themr'
import Form from 'react-vanilla-form'
import {
  pipe,
  values,
  keys,
  mapObjIndexed,
  pick,
  merge,
  isEmpty,
  reject,
  isNil,
  path,
  pathOr,
  omit,
} from 'ramda'

import { Switch, Button } from '../../components'

import BoletoForm from './BoletoForm'
import CreditCardForm from './CreditCardForm'

import { addPageInfo } from '../../actions'
import {
  required,
  minLength,
  maxLength,
  isValidDate,
} from '../../utils/validations'

const getDefaultMethod = ({
  defaultMethod,
  paymentMethods,
}) => defaultMethod || keys(paymentMethods)[0]

const applyThemr = themr('UIPaymentPage')

const createSwitchItems = ({
  theme,
  base,
  transaction,
  isBigScreen,
  paymentType,
  formData,
  flipped,
  handleFlipCard,
}) => {
  const { amount, paymentMethods } = transaction
  const { boleto, creditcard } = paymentMethods

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
        installmentsIndex: 0,
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

  let choosedPaymentOptions = Object.assign({}, paymentMethods)

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

    const formData = path(['payment', 'info'], props) || {}

    this.state = {
      formData,
      clickedPaymentType: null,
      flipped: false,
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

  handleSwitchPayment = clickedPaymentType => (
    this.setState({ clickedPaymentType })
  )

  handleFormSubmit = (formData, errors) => {
    const {
      handleSubmit,
      handlePageChange,
      transaction,
      defaultMethod,
    } = this.props

    let data = formData

    const { clickedPaymentType } = this.state
    const { paymentMethods } = transaction

    const paymentType = clickedPaymentType || getDefaultMethod({
      defaultMethod,
      paymentMethods,
    })

    const method = merge(
      paymentMethods[paymentType],
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
    }

    if (paymentType === 'boleto') {
      data = { boleto: true }
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
      defaultMethod,
      theme,
      paymentType,
      transaction,
      isBigScreen,
      base,
    } = this.props

    const {
      formData,
      formValid,
      flipped,
      clickedPaymentType,
    } = this.state

    const {
      paymentMethods,
    } = transaction

    let validation = null

    const selectedPaymentType = clickedPaymentType || getDefaultMethod({
      defaultMethod,
      paymentMethods,
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
  base: PropTypes.string.isRequired,
  theme: PropTypes.shape(),
  paymentType: PropTypes.string,
  transaction: PropTypes.shape().isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isBigScreen: PropTypes.bool.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  defaultMethod: PropTypes.string.isRequired,
}

SwitchPayment.defaultProps = {
  theme: {},
  paymentType: null,
  payment: null,
}

const mapStateToProps = ({ screenSize, pageInfo }) => ({
  isBigScreen: screenSize.isBigScreen,
  payment: pageInfo.payment,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
})(applyThemr(SwitchPayment))
