import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { themr } from 'react-css-themr'
import Form from 'react-vanilla-form'
import { isEmpty, reject, isNil, pathOr } from 'ramda'
import classNames from 'classnames'

import {
  Grid,
  Row,
  Col,
} from 'former-kit'
import { incrementFinalAmount, resetFinalAmount } from '../../actions'

import {
  Button,
} from '../../components'

import CreditCardForm from './CreditCardForm'

import {
  required,
  minLength,
  maxLength,
  isValidDate,
} from '../../utils/validations'
import updateMultipleAmount from '../../utils/helpers/updateMultipleAmount'
import { formatToBRL } from './../../utils/masks/'
import getInstallments from './../../utils/helpers/getInstallments'
import getInputAmountValue from './../../utils/helpers/getInputAmountValue'

const applyThemr = themr('UIPaymentPage')

const defaultColSize = 12
const mediumColSize = 6

const getValidations = ({
  inputAmountNames,
  firstPrefix,
  secondPrefix,
}) => {
  const firstAmountInputName = inputAmountNames.first
  const secondAmountInputName = inputAmountNames.second

  const firstCardValidation = {
    [firstAmountInputName]: [required],
    [`${firstPrefix}cardNumber`]: [
      required,
      minLength(16),
      maxLength(16),
    ],
    [`${firstPrefix}holderName`]: [
      required,
      minLength(10),
      maxLength(20),
    ],
    [`${firstPrefix}expiration`]: [
      required,
      minLength(4),
      maxLength(4),
      isValidDate,
    ],
    [`${firstPrefix}cvv`]: [
      required,
      minLength(3),
      maxLength(3),
    ],
    [`${firstPrefix}installments`]: [required],
  }

  const secondCardValidation = {
    [secondAmountInputName]: [required],
    [`${secondPrefix}cardNumber`]: [
      required,
      minLength(16),
      maxLength(16),
    ],
    [`${secondPrefix}holderName`]: [
      required,
      minLength(10),
      maxLength(20),
    ],
    [`${secondPrefix}expiration`]: [
      required,
      minLength(4),
      maxLength(4),
      isValidDate,
    ],
    [`${secondPrefix}cvv`]: [
      required,
      minLength(3),
      maxLength(3),
    ],
    [`${secondPrefix}installments`]: [required],
  }

  return {
    ...firstCardValidation,
    ...secondCardValidation,
  }
}

const getSelectedInstallment = ({ amount, creditcard, formData }) => (
  (name, installmentIndex) => {
    const selectedInstallment = formData[`${name}-installments`]
    const installmentsList = getInstallments(
      amount,
      creditcard,
      installmentIndex
    )
    const interest = installmentsList.find((elem, index) => (
      index.toString() === selectedInstallment
    ))

    return interest
  }
)

class MultipleCreditCards extends Component {
  constructor () {
    super()

    const inputPrefixes = {
      first: 'first-',
      second: 'second-',
    }

    const inputAmountNames = {
      first: `${inputPrefixes.first}amount`,
      second: `${inputPrefixes.second}amount`,
    }

    this.state = {
      formData: {},
      formValid: false,
      inputPrefixes,
      inputAmountNames,
    }
  }

  handleChangeForm = (newFormData, errors) => {
    const { formData, inputAmountNames } = this.state
    const { transaction } = this.props

    const amounts = updateMultipleAmount({
      formData,
      newFormData,
      inputAmountNames,
      transaction,
    })

    this.setState({
      formData: amounts,
      formValid: isEmpty(reject(isNil, errors)),
    })
  }

  handleSubmit = (formData, errors) => {
    const {
      handleIncrementFinalAmount,
      handleResetFinalAmount,
      handleSubmit,
      transaction,
    } = this.props

    handleResetFinalAmount()

    const { amount, paymentMethods } = transaction
    const { creditcard } = paymentMethods

    const values = {
      amount,
      creditcard,
      formData,
    }

    const firstCreditCardInstallment =
      getSelectedInstallment({ ...values })(
        'first',
        0,
      )

    const secondCreditCardInstallment =
      getSelectedInstallment({ ...values })(
        'second',
        1,
      )

    const firstInterest = pathOr(
      0,
      ['interest'],
      firstCreditCardInstallment
    )

    const secondInterest = pathOr(
      0,
      ['interest'],
      secondCreditCardInstallment
    )

    const finalInterest = firstInterest + secondInterest

    if (finalInterest) {
      handleIncrementFinalAmount(finalInterest)
    }

    handleSubmit(formData, errors)
  }

  render () {
    const { theme,
      transaction,
      isBigScreen,
    } = this.props

    const {
      formData,
      formValid,
      inputPrefixes,
      inputAmountNames,
    } = this.state

    const { amount, paymentConfig } = transaction
    const { creditcard } = paymentConfig

    const firstPrefix = inputPrefixes.first
    const secondPrefix = inputPrefixes.second

    const gridClasses = classNames(
      theme.page,
      theme.multiPayment,
    )

    const firstCreditCardAmount = getInputAmountValue(
      formData,
      inputAmountNames,
      'first',
      amount
    )

    const secondCreditCardAmount = getInputAmountValue(
      formData,
      inputAmountNames,
      'second',
      amount
    )

    return (
      <Form
        data={formData}
        onChange={this.handleChangeForm}
        onSubmit={this.handleSubmit}
        customErrorProp="error"
        validation={{
          ...getValidations({
            inputAmountNames,
            firstPrefix,
            secondPrefix,
          }),
        }}
      >
        <Grid className={gridClasses}>
          <Row>
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
              palm={defaultColSize}
            >
              <Col
                tv={defaultColSize}
                desk={defaultColSize}
                tablet={defaultColSize}
                palm={defaultColSize}
              >
                <span className={theme.title}>Cartão 1</span>
              </Col>
              <Col
                tv={defaultColSize}
                desk={defaultColSize}
                tablet={defaultColSize}
                palm={defaultColSize}
              >
                {CreditCardForm({
                  theme,
                  amount: firstCreditCardAmount,
                  data: creditcard,
                  installmentsIndex: 0,
                  formData,
                  isBigScreen,
                  enableSplitAmount: true,
                  inputPrefixName: firstPrefix,
                  amountPrefixName: inputAmountNames.first,
                  showCreditCard: false,
                  confirmButtonVisible: false,
                  handleSubmit: this.handleSubmit,
                  installmentInitialValue:
                    creditcard.installments[0].initial.toString(),
                  installmentsOptions: getInstallments(
                    firstCreditCardAmount,
                    creditcard,
                    0
                  ),
                })}
              </Col>
            </Col>
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
              palm={defaultColSize}
            >
              <Col
                tv={defaultColSize}
                desk={defaultColSize}
                tablet={defaultColSize}
                palm={defaultColSize}
              >
                <span className={theme.title}>Cartão 2</span>
              </Col>
              <Col
                tv={defaultColSize}
                desk={defaultColSize}
                tablet={defaultColSize}
                palm={defaultColSize}
              >
                {CreditCardForm({
                  theme,
                  amount: secondCreditCardAmount,
                  data: creditcard,
                  installmentsIndex: 1,
                  formData,
                  isBigScreen,
                  enableSplitAmount: true,
                  inputPrefixName: secondPrefix,
                  amountPrefixName: inputAmountNames.second,
                  showCreditCard: false,
                  confirmButtonVisible: false,
                  handleSubmit: this.handleSubmit,
                  iinstallmentInitialValue:
                    creditcard.installments[1].initial.toString(),
                  installmentsOptions: getInstallments(
                    secondCreditCardAmount,
                    creditcard,
                    1
                  ),
                })}
              </Col>
            </Col>
            <Col
              tv={defaultColSize}
              desk={defaultColSize}
              tablet={defaultColSize}
              palm={defaultColSize}
              align={'end'}
            >
              <Col
                tv={defaultColSize}
                desk={defaultColSize}
                tablet={defaultColSize}
                palm={defaultColSize}
                align={'end'}
              >
                <h4 className={theme.amount} >
                  Valor a pagar: {formatToBRL(amount)}
                </h4>
              </Col>
              <Col
                tv={defaultColSize}
                desk={defaultColSize}
                tablet={defaultColSize}
                palm={defaultColSize}
                className={theme.footerNoPadding}
                align={'end'}
              >
                <Button
                  className={theme.confirmBtn}
                  size="extra-large"
                  type="submit"
                  disabled={!formValid}
                >
                  Finalizar compra
                </Button>
              </Col>
            </Col>
          </Row>
        </Grid>
      </Form>
    )
  }
}

MultipleCreditCards.propTypes = {
  theme: PropTypes.shape(),
  isBigScreen: PropTypes.bool.isRequired,
  transaction: PropTypes.shape().isRequired,
  handleIncrementFinalAmount: PropTypes.func.isRequired,
  handleResetFinalAmount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

MultipleCreditCards.defaultProps = {
  theme: {},
}

const mapStateToProps = ({ screenSize }) => ({
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps, {
  handleIncrementFinalAmount: incrementFinalAmount,
  handleResetFinalAmount: resetFinalAmount,
})(applyThemr(MultipleCreditCards))
