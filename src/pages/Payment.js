import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'
import PaymentCard from 'react-payment-card-component'
import { pick } from 'ramda'
import { connect } from 'react-redux'
import Form from 'react-vanilla-form'

import { Grid, Row, Col } from './../components/Grid'
import Switch from './../components/Switch'
import Input from './../components/Input'
import Dropdown from './../components/Dropdown'
import Button from './../components/Button'

import formatToBRL from './../utils/helpers/formatToBRL'
import { applyDiscount, generateInstallmnets } from './../utils/calculations'

import Barcode from './../images/barcode.svg'
import { addPageInfo } from '../actions'
import { required } from '../utils/validations'

const applyThemr = themr('UIPaymentPage')

const defaultColSize = 12
const mediumColSize = 6

const findCreditCard = paymentMethod => paymentMethod.type === 'creditcard'

class PaymentPage extends Component {
  constructor (props) {
    super(props)

    const creditcardMethod = props.paymentMethods.filter(findCreditCard)
    const installments = creditcardMethod.defaultInstallments || 1

    this.state = {
      creditcard: {
        cardNumber: '',
        holderName: '',
        expiration: '',
        cvv: '',
        installments,
        flipped: false,
      },
      selectedPayment: 0,
    }
  }

  componentWillUnmount () {
    const { paymentMethods } = this.props
    const { selectedPayment } = this.state

    const method = paymentMethods[selectedPayment]

    const payment = {
      method,
    }

    if (method.type === 'creditcard') {
      payment.info = pick([
        'cardNumber',
        'holderName',
        'cvv',
        'expiration',
        'installments',
      ], this.state.creditcard)
    }

    this.props.handlePageChange({
      page: 'payment',
      pageInfo: payment,
    })
  }

  handleSwitchChange = (choice) => {
    this.setState({ selectedPayment: choice })
  }

  handleChangeForm = (values) => {
    this.setState({ creditcard: values })
  }

  handleFlipCard = () => {
    this.setState(previousState => ({
      ...previousState,
      creditcard: {
        ...previousState.creditcard,
        flipped: !previousState.creditcard.flipped,
      },
    }))
  }

  renderCreditcard = (creditcard) => {
    const {
      cardNumber,
      holderName,
      expiration,
      cvv,
      flipped,
    } = this.state.creditcard

    const { theme, amount, isBigScreen } = this.props

    const installmentsOptions = generateInstallmnets(creditcard, amount)

    return (
      <Form
        data={this.state.creditcard}
        onChange={this.handleChangeForm}
        onSubmit={this.props.handleSubmit}
        customErrorProp="error"
        validation={{
          cardNumber: [required],
          holderName: [required],
          expiration: [required],
          cvv: [required],
        }}
      >
        <Grid className={theme.page}>
          <Row>
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
              palm={defaultColSize}
              alignCenter
              hidden={!isBigScreen}
            >
              <PaymentCard
                number={cardNumber || '•••• •••• •••• ••••'}
                cvv={cvv || '•••'}
                holderName={holderName || 'Nome Completo'}
                expiration={expiration || 'MM/AA'}
                flipped={flipped}
              />
              <h4 className={theme.amount} >
                Valor a pagar: {formatToBRL(amount)}
              </h4>
            </Col>
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
              palm={defaultColSize}
            >
              <Row>
                <Col
                  tv={defaultColSize}
                  desk={defaultColSize}
                  tablet={defaultColSize}
                  palm={defaultColSize}
                >
                  <Input
                    name="cardNumber"
                    label="Número do cartão"
                    type="number"
                    mask="1111 1111 1111 1111"
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  tv={defaultColSize}
                  desk={defaultColSize}
                  tablet={defaultColSize}
                  palm={defaultColSize}
                >
                  <Input
                    name="holderName"
                    label="Nome (igual o do cartão)"
                    maxLength="24"
                  />
                </Col>
              </Row>
              <Row
                className={theme.tooltipRow}
              >
                <Col
                  tv={7}
                  desk={7}
                  tablet={mediumColSize}
                  palm={mediumColSize}
                >
                  <Input
                    name="expiration"
                    label="Data de validade"
                    mask="11/11"
                  />
                </Col>
                <Col
                  tv={5}
                  desk={5}
                  tablet={mediumColSize}
                  palm={mediumColSize}
                >
                  <Input
                    name="cvv"
                    label="CVV"
                    type="number"
                    mask="111"
                    tooltip={
                      isBigScreen &&
                      'O CVV são os três números que ficam na parte de trás do seu cartão.'
                    }
                    tooltipClassName={theme.cvvTooltip}
                    onFocus={this.handleFlipCard}
                    onBlur={this.handleFlipCard}
                  />
                </Col>
              </Row>
              {
                installmentsOptions.length &&
                <Row>
                  <Col
                    tv={defaultColSize}
                    desk={defaultColSize}
                    tablet={defaultColSize}
                    palm={defaultColSize}
                  >
                    <Dropdown
                      options={
                        installmentsOptions.map(option => (
                          { ...option, value: option.value.toString() }
                        ))
                      }
                      name="installments"
                      label="Quantidade de Parcelas"
                      title="Selecione"
                    />
                  </Col>
                </Row>
              }
              <Row hidden={isBigScreen}>
                <h4 className={theme.amount} >
                  Valor a pagar: {formatToBRL(amount)}
                </h4>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col
              desk={defaultColSize}
              tv={defaultColSize}
              tablet={defaultColSize}
              palm={defaultColSize}
              alignEnd
            >
              <Button
                size="extra-large"
                relevance="normal"
                type="submit"
                className={theme.button}
              >
                Confirmar
              </Button>
            </Col>
          </Row>
        </Grid>
      </Form>
    )
  }

  renderBoleto = () => {
    const { theme, paymentMethods, amount } = this.props
    const { discount } = paymentMethods
      .find(payment => payment.type === 'boleto')

    return (
      <Form
        data={{ boleto: true }}
        onSubmit={this.props.handleSubmit}
      >
        <Col
          tv={defaultColSize}
          desk={defaultColSize}
          tablet={defaultColSize}
          palm={defaultColSize}
        >
          <div className={theme.boletoContainer} >
            <img src={Barcode} alt="barcode" className={theme.barcodeImg} />
            <h4
              className={
                classNames(
                  theme.amount,
                  theme.boletoAmount,
                )
              }
            >
              Valor a pagar:
              {
                discount ?
                  formatToBRL(applyDiscount(discount.type, discount.value, amount)) :
                  formatToBRL(amount)
              }
            </h4>
            <span className={theme.boletoInfo}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Mauris risus nunc, malesuada vitae libero venenatis,
              vehicula luctus nulla. Aliquam erat volutpat.
              Sed porttitor ex vestibulum augue fermentum molestie.
              Sed id convallis augue. Nam id malesuada nisl.
              Quisque quis orci eget.
            </span>

          </div>
        </Col>
        <Row>
          <Col
            desk={defaultColSize}
            tv={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
            alignEnd
          >
            <Button
              size="extra-large"
              relevance="normal"
              type="submit"
              className={theme.button}
            >
              Confirmar
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }

  render () {
    const { selectedPayment } = this.state
    const { paymentMethods } = this.props

    const renders = {
      boleto: this.renderBoleto,
      creditcard: this.renderCreditcard,
    }

    const paymentOptions = paymentMethods.map(payment => ({
      title: payment.title,
      subtitle: payment.subtitle,
      value: payment.type,
      content: renders[payment.type](payment),
    }))

    return (
      <Switch
        onChange={this.handleSwitchChange}
        items={paymentOptions}
        selected={selectedPayment}
        name="paymentOptions"
      />
    )
  }
}

PaymentPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.string,
    barcodeImg: PropTypes.string,
    boletoAmount: PropTypes.string,
    boletoContainer: PropTypes.string,
    cvvTooltip: PropTypes.string,
  }),
  isBigScreen: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

PaymentPage.defaultProps = {
  theme: {},
  payment: {},
  creditcard: {},
}

const mapStateToProps = ({ screenSize }) => ({
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
})(applyThemr(PaymentPage))
