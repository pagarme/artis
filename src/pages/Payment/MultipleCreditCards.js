import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { themr } from 'react-css-themr'
import Form from 'react-vanilla-form'
import { isEmpty, reject, isNil } from 'ramda'
import classNames from 'classnames'

import {
  Grid,
  Row,
  Col,
  Button,
} from '../../components'

import CreditCardForm from './CreditCardForm'

import { required } from '../../utils/validations'
import updateMultipleAmount from '../../utils/helpers/updateMultipleAmount'
import formatToBRL from './../../utils/helpers/formatToBRL'

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
    [`${firstPrefix}cardNumber`]: [required],
    [`${firstPrefix}holderName`]: [required],
    [`${firstPrefix}expiration`]: [required],
    [`${firstPrefix}cvv`]: [required],
    [`${firstPrefix}installments`]: [required],
  }

  const secondCardValidation = {
    [secondAmountInputName]: [required],
    [`${secondPrefix}cardNumber`]: [required],
    [`${secondPrefix}holderName`]: [required],
    [`${secondPrefix}expiration`]: [required],
    [`${secondPrefix}cvv`]: [required],
    [`${secondPrefix}installments`]: [required],
  }

  return {
    ...firstCardValidation,
    ...secondCardValidation,
  }
}

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

  render () {
    const { theme,
      transaction,
      isBigScreen,
      handleSubmit,
    } = this.props

    const {
      formData,
      formValid,
      inputPrefixes,
      inputAmountNames,
    } = this.state

    const { amount, paymentMethods } = transaction
    const { creditcard } = paymentMethods

    const firstPrefix = inputPrefixes.first
    const secondPrefix = inputPrefixes.second

    const gridClasses = classNames(
      theme.page,
      theme.multiPayment,
    )

    return (
      <Form
        data={formData}
        onChange={this.handleChangeForm}
        onSubmit={handleSubmit}
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
                  amount,
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
                  amount,
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
                })}
              </Col>
            </Col>
            <Col
              tv={defaultColSize}
              desk={defaultColSize}
              tablet={defaultColSize}
              palm={defaultColSize}
              alignEnd
            >
              <Col
                tv={defaultColSize}
                desk={defaultColSize}
                tablet={defaultColSize}
                palm={defaultColSize}
                alignEnd
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
                alignEnd
              >
                <Button
                  className={theme.confirmBtn}
                  size="extra-large"
                  relevance="normal"
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
  handleSubmit: PropTypes.func.isRequired,
}

MultipleCreditCards.defaultProps = {
  theme: {},
}

const mapStateToProps = ({ screenSize }) => ({
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps, null)(applyThemr(MultipleCreditCards))
