import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { themr } from 'react-css-themr'
import { pipe, values, mapObjIndexed, pick, merge } from 'ramda'
import Form from 'react-vanilla-form'
import { Switch, Button } from '../../components'

import BoletoForm from './BoletoForm'
import CreditCardForm from './CreditCardForm'

import { addPageInfo } from '../../actions'
import { required } from '../../utils/validations'

const applyThemr = themr('UIPaymentPage')

const createSwitchItems = ({
  theme,
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
        amount,
        data: boleto,
        showBoletoDetails: true,
      }),
    },
    creditcard: {
      title: 'Cartão de Crédito',
      render: () => CreditCardForm({
        theme,
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

const getFirstPaymentMethod = ({ transaction, paymentType }) => (
  paymentType || Object.keys(transaction.paymentMethods)[0]
)

class SwitchPayment extends Component {
  constructor (props) {
    super()

    const { transaction, paymentType } = props

    const selectedPaymentType = getFirstPaymentMethod({
      transaction,
      paymentType,
    })

    this.state = {
      formData: {},
      selectedPaymentType,
      flipped: false,
    }
  }

  handleChangeForm = (formData) => {
    this.setState({ formData })
  }

  handleFlipCard = () => {
    this.setState(previousState => ({
      ...previousState,
      flipped: !previousState.flipped,
    }))
  }

  handleSwitchPayment = selectedPaymentType => (
    this.setState({ selectedPaymentType })
  )

  handleFormSubmit = (formData, errors) => {
    const { handleSubmit, handlePageChange, transaction } = this.props
    const { selectedPaymentType } = this.state
    const { paymentMethods } = transaction

    const method = merge(
      paymentMethods[selectedPaymentType],
      { type: selectedPaymentType }
    )

    const payment = {
      method,
      type: selectedPaymentType,
    }

    if (selectedPaymentType === 'creditcard') {
      payment.info = pick([
        'cardNumber',
        'holderName',
        'cvv',
        'expiration',
        'installments',
      ], formData)
    }

    handlePageChange({
      page: 'payment',
      pageInfo: payment,
    })

    handleSubmit(formData, errors)
  }

  render () {
    const {
      theme,
      paymentType,
      transaction,
      isBigScreen,
    } = this.props

    const { formData, flipped, selectedPaymentType } = this.state

    let data = {}
    let validation = null

    if (selectedPaymentType === 'creditcard') {
      data = this.formData
      validation = {
        cardNumber: [required],
        holderName: [required],
        expiration: [required],
        cvv: [required],
        installments: [required],
      }
    }

    if (selectedPaymentType === 'boleto') {
      data = { boleto: true }
    }

    return (
      <Form
        data={{ ...data }}
        onChange={this.handleChangeForm}
        onSubmit={this.handleFormSubmit}
        customErrorProp="error"
        validation={validation}
      >
        {Switch({
          theme,
          name: 'paymentOptions',
          selected: selectedPaymentType,
          items: createSwitchItems({
            theme,
            isBigScreen,
            transaction,
            paymentType,
            formData,
            flipped,
            handleFlipCard: this.handleFlipCard,
          }),
          handleSwitchPayment: this.handleSwitchPayment,
        })}
        <Button
          alignEnd
          className={theme.confirmBtn}
          relevance="normal"
          size="extra-large"
          type="submit"
        >
          Confirmar
        </Button>
      </Form>
    )
  }
}

SwitchPayment.propTypes = {
  theme: PropTypes.shape(),
  paymentType: PropTypes.string,
  transaction: PropTypes.shape().isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isBigScreen: PropTypes.bool.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

SwitchPayment.defaultProps = {
  theme: {},
  paymentType: null,
}

const mapStateToProps = ({ screenSize }) => ({
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
})(applyThemr(SwitchPayment))
