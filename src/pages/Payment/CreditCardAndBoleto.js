import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { themr } from 'react-css-themr'
import Form from 'react-vanilla-form'
import { isEmpty, reject, isNil, prop } from 'ramda'
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
import BoletoForm from './BoletoForm'

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

class CreditCardAndBoleto extends Component {
  state = {
    formData: {},
    formValid: false,
    inputAmountNames: {
      first: 'creditcard-amount',
      second: 'boleto-amount',
    },
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
    const { handleSubmit } = this.props
    const {
      transaction,
      handleIncrementFinalAmount,
      handleResetFinalAmount,
    } = this.props

    handleResetFinalAmount()

    const { amount, paymentMethods } = transaction
    const { creditcard } = paymentMethods

    const selectedInstallment = formData.installments
    const installmentsList = getInstallments(amount, creditcard, 0)
    const installment = installmentsList.find((elem, index) => (
      index.toString() === selectedInstallment
    ))
    const interest = prop('interest', installment)

    if (interest) {
      handleIncrementFinalAmount(interest)
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
      inputAmountNames,
    } = this.state

    const { amount, paymentConfig } = transaction
    const { boleto, creditcard } = paymentConfig

    const creditcardAmountInputName = `${inputAmountNames.first}`
    const boletoAmountInputName = `${inputAmountNames.second}`

    const gridClasses = classNames(
      theme.page,
      theme.multiPayment,
    )

    const creditCardAmount = getInputAmountValue(formData,
      inputAmountNames,
      'first',
      amount
    )
    const boletoAmount = getInputAmountValue(formData,
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
          [creditcardAmountInputName]: [required],
          [boletoAmountInputName]: [required],
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
          installments: [required],
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
                  amount: creditCardAmount,
                  data: creditcard,
                  formData,
                  isBigScreen,
                  enableSplitAmount: true,
                  installmentsIndex: 0,
                  amountPrefixName: inputAmountNames.first,
                  showCreditCard: false,
                  inputPrefixName: '',
                  confirmButtonVisible: false,
                  handleSubmit: this.handleSubmit,
                  installmentInitialValue:
                    creditcard.installments[0].initial.toString(),
                  installmentsOptions: getInstallments(
                    creditCardAmount,
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
                <span className={theme.title}>Boleto</span>
              </Col>
              <Col
                tv={defaultColSize}
                desk={defaultColSize}
                tablet={defaultColSize}
                palm={defaultColSize}
              >
                {BoletoForm({
                  theme,
                  amount: boletoAmount,
                  data: boleto,
                  enableInputAmount: true,
                  amountPrefixName: inputAmountNames.second,
                  showBoletoDetails: false,
                  confirmButtonVisible: false,
                  handleSubmit: this.handleSubmit,
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
                align={'end'}
                className={theme.footerNoPadding}
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

CreditCardAndBoleto.propTypes = {
  theme: PropTypes.shape(),
  isBigScreen: PropTypes.bool.isRequired,
  transaction: PropTypes.shape().isRequired,
  handleIncrementFinalAmount: PropTypes.func.isRequired,
  handleResetFinalAmount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

CreditCardAndBoleto.defaultProps = {
  theme: {},
}

const mapStateToProps = ({ screenSize }) => ({
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps, {
  handleIncrementFinalAmount: incrementFinalAmount,
  handleResetFinalAmount: resetFinalAmount,
})(applyThemr(CreditCardAndBoleto))
