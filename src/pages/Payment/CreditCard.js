import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from 'react-vanilla-form'
import classNames from 'classnames'
import PaymentCard from 'react-payment-card-component'

import {
  isEmpty,
  isNil,
  merge,
  path,
  prop,
  reject,
} from 'ramda'

import {
  Dropdown,
  FormInput,
  ThemeConsumer,
} from 'former-kit'

import {
  required,
  isValidDate,
  minLength,
  maxLength,
} from '../../utils/validations'

import {
  addPageInfo,
  updateFinalAmount,
} from '../../actions'

import {
  NavigationBar,
} from '../../components'

import changeInstallmentsToArray from './../../utils/helpers/changeInstallmentsToArray' // eslint-disable-line

import {
  formatToBRL,
  removeMaskPlaceholder,
} from './../../utils/masks/'

const consumeTheme = ThemeConsumer('UICreditCardPage')

class CreditCardPage extends Component {
  constructor (props) {
    super(props)

    const { transaction } = props

    this.state = {
      ...transaction,
      flipped: false,
    }
  }

  handleChangeForm = (values, errors) => {
    this.setState({
      ...values,
      formValid: isEmpty(reject(isNil, errors)),
    })
  }

  handleInstallmentsChange = (e) => {
    const {
      handleUpdateFinalAmount,
      installments,
    } = this.props

    const selectedInstallment = e.target.value
    const installment = installments[selectedInstallment - 1]
    const finalAmount = prop('amount', installment)

    handleUpdateFinalAmount({ finalAmount })
  }

  handleFormSubmit = (values, errors) => {
    const paymentConfig = path(['transaction', 'paymentConfig'], this.props)
    const { installments } = this.props
    const installmentText = prop('name', installments[values.installments - 1])

    const method = merge(
      paymentConfig.creditcard,
      { type: 'creditcard' },
    )

    const payment = {
      method,
      type: 'creditcard',
      info: merge(
        this.state,
        {
          installmentText,
        }
      ),
    }

    this.props.handlePageChange({
      page: 'payment',
      pageInfo: payment,
    })

    this.setState({
      formValid: isEmpty(reject(isNil, errors)),
    })

    this.props.handleSubmit(values, errors)
  }

  handleFlipCard = () => {
    this.setState(previousState => ({
      ...previousState,
      flipped: !previousState.flipped,
    }))
  }

  render () {
    const {
      flipped,
      cardNumber = '•••• •••• •••• ••••',
      holderName = 'Nome Completo',
      expiration = 'MM/AA',
      cvv = '•••',
    } = this.state

    const {
      finalAmount,
      handlePreviousButton,
      theme,
      installments,
    } = this.props

    return (
      <Form
        className={theme.creditcardForm}
        onChange={this.handleChangeForm}
        onSubmit={this.handleFormSubmit}
        customErrorProp="error"
        validation={{
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
        }}
      >
        <h2 className={theme.title}>
          Cartão de crédito
        </h2>
        <div className={theme.contentWrapper}>
          <div className={theme.paymentCardContainer}>
            <PaymentCard
              number={removeMaskPlaceholder(cardNumber)}
              cvv={removeMaskPlaceholder(cvv)}
              holderName={removeMaskPlaceholder(holderName)}
              expiration={removeMaskPlaceholder(expiration)}
              flipped={flipped}
              className={classNames(theme.paymentCard, {
                [theme.cardFlipped]: flipped,
              })}
            />
          </div>
          <div className={theme.inputsContainer}>
            <FormInput
              name="cardNumber"
              label="Número do cartão"
              mask="1111 1111 1111 1111"
            />
            <FormInput
              name="holderName"
              label="Nome (igual o do cartão)"
              maxLength="24"
            />
            <div className={theme.inputGroup}>
              <FormInput
                name="expiration"
                label="Válido até"
                mask="11/11"
                className={theme.fieldExpiration}
              />
              <FormInput
                name="cvv"
                label="Cód. segurança"
                type="number"
                mask="111"
                className={theme.fieldCvv}
                onFocus={this.handleFlipCard}
                onBlur={this.handleFlipCard}
              />
            </div>
            <div className={theme.dropdownContainer}>
              {
                !isEmpty(installments) &&
                <Dropdown
                  options={installments}
                  name="installments"
                  placeholder="Em quantas parcelas?"
                  onChange={this.handleInstallmentsChange}
                />
              }
            </div>
          </div>
        </div>
        <NavigationBar
          handlePreviousButton={handlePreviousButton}
          formValid={!this.state.formValid}
          prevTitle="Ops, voltar"
          nextTitle={`Pagar ${formatToBRL(finalAmount)}`}
        />
      </Form>
    )
  }
}

CreditCardPage.propTypes = {
  theme: PropTypes.shape(),
  finalAmount: PropTypes.number.isRequired,
  transaction: PropTypes.shape({
    amount: PropTypes.number,
    defaultMethod: PropTypes.string,
    paymentConfig: PropTypes.shape({
      creditcard: PropTypes.shape({
        installments: PropTypes.shape(),
        invoiceDescriptor: PropTypes.string,
      }),
    }),
    paymentMethods: PropTypes.arrayOf(PropTypes.array),
  }),
  installments: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handlePreviousButton: PropTypes.func.isRequired,
  handleUpdateFinalAmount: PropTypes.func.isRequired,
}

CreditCardPage.defaultProps = {
  theme: {},
  transaction: {},
}

const mapStateToProps = ({ screenSize, transactionValues }) => ({
  isBigScreen: screenSize.isBigScreen,
  amount: transactionValues.amount,
  finalAmount: transactionValues.finalAmount,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
  handleUpdateFinalAmount: updateFinalAmount,
})(consumeTheme(CreditCardPage))
