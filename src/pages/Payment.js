import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'
import PaymentCard from 'react-payment-card-component'
import { pick, path, replace, isNil, reject, isEmpty } from 'ramda'
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
const removeMask = replace(/_/g, '')

class PaymentPage extends Component {
  constructor (props) {
    super(props)

    const creditcardMethod = props.paymentMethods.filter(findCreditCard)
    const installments = creditcardMethod.defaultInstallments || 1

    const creditcard = path(['payment', 'info'], props)

    this.state = {
      creditcard: {
        ...creditcard,
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

  handleChangeForm = (values, errors) => {
    this.setState({
      creditcard: values,
      formValid: isEmpty(reject(isNil, errors)),
    })
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
      cardNumber = '•••• •••• •••• ••••',
      holderName = 'Nome Completo',
      expiration = 'MM/AA',
      cvv = '•••',
      flipped,
      installments = 1,
    } = this.state.creditcard

    const { theme, base, amount, isBigScreen } = this.props

    const installmentsOptions = generateInstallmnets(creditcard, amount)

    return (
      <Form
        data={{ ...this.state.creditcard, installments: installments.toString() }}
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
                number={removeMask(cardNumber)}
                cvv={removeMask(cvv)}
                holderName={removeMask(holderName)}
                expiration={removeMask(expiration)}
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
                    base={base}
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
                    base={base}
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
                    base={base}
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
                    base={base}
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
                      base={base}
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
                base={base}
                size="extra-large"
                relevance="normal"
                type="submit"
                className={theme.button}
                full={!isBigScreen}
                disabled={!this.state.formValid}
              >
                Finalizar compra
              </Button>
            </Col>
          </Row>
        </Grid>
      </Form>
    )
  }

  renderBoleto = () => {
    const { base, theme, paymentMethods, amount, isBigScreen } = this.props
    const { discount } = paymentMethods
      .find(payment => payment.type === 'boleto')

    return (
      <Form
        data={{ boleto: true }}
        onSubmit={this.props.handleSubmit}
      >
        <Grid className={theme.page}>
          <Row>
            <Col
              tv={defaultColSize}
              desk={defaultColSize}
              tablet={defaultColSize}
              palm={defaultColSize}
            >
              <div className={classNames(theme[base], theme.boletoContainer)}>
                <Barcode className={theme.barcodeImg} />
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
                full={!isBigScreen}
              >
                Finalizar compra
              </Button>
            </Col>
          </Row>
        </Grid>
      </Form>
    )
  }

  render () {
    const { selectedPayment } = this.state
    const { base, paymentMethods } = this.props

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
        base={base}
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
    light: PropTypes.string,
    dark: PropTypes.string,
  }),
  base: PropTypes.string,
  isBigScreen: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

PaymentPage.defaultProps = {
  theme: {},
  base: 'dark',
  payment: {},
  creditcard: {},
}

const mapStateToProps = ({ screenSize, pageInfo }) => ({
  isBigScreen: screenSize.isBigScreen,
  payment: pageInfo.payment,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
})(applyThemr(PaymentPage))
