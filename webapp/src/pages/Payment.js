import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'
import PaymentCard from 'react-payment-card-component'
import { pick } from 'ramda'

import { Grid, Row, Col } from './../components/Grid'
import Switch from './../components/Switch'
import Input from './../components/Input'

import formatToBRL from './../utils/formatToBRL'
import discountParser from './../utils/discountParser'
import Barcode from './../images/barcode.svg'

const applyThemr = themr('UIPaymentPage')

const defaultColSize = 12
const mediumColSize = 6

class Payment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      creditcard: {
        cardNumber: '',
        holderName: '',
        expiration: '',
        cvv: '',
        flipped: false,
      },
      selectedPayment: 0,
    }

    this.handleFlipCard = this.handleFlipCard.bind(this)
    this.handleSwitchChange = this.handleSwitchChange.bind(this)
    this.handleCreditcardtChange = this.handleCreditcardtChange.bind(this)
    this.renderBoleto = this.renderBoleto.bind(this)
  }

  componentWillUnmount () {
    const { paymentMethods } = this.props
    const { selectedPayment } = this.state

    const paymentMethod = paymentMethods[selectedPayment]

    if (paymentMethod.type === 'creditcard') {
      paymentMethod.info = pick([
        'cardNumber',
        'holderName',
        'cvv',
        'expiration',
      ], this.state.creditcard)
    }

    const payment = {
      paymentMethod,
    }

    this.props.handlePageChange(payment, 'payment')
  }

  handleSwitchChange (choice) {
    this.setState({ selectedPayment: choice })
  }

  handleCreditcardtChange (e) {
    const { name, value } = e.target

    this.setState(previousState => ({
      ...previousState,
      creditcard: {
        ...previousState.creditcard,
        [name]: value,
      },
    }))
  }

  handleFlipCard () {
    this.setState(previousState => ({
      ...previousState,
      creditcard: {
        ...previousState.creditcard,
        flipped: !previousState.creditcard.flipped,
      },
    }))
  }

  renderCreditcard () {
    const {
      cardNumber,
      holderName,
      expiration,
      cvv,
      flipped,
    } = this.state.creditcard

    const { theme, amount, isBigScreen } = this.props

    return (
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
              <Input
                name="cardNumber"
                label="Número do cartão"
                value={cardNumber}
                type="number"
                mask="1111 1111 1111 1111"
                onChange={this.handleCreditcardtChange}
              />
            </Row>
            <Row>
              <Input
                name="holderName"
                label="Nome"
                hint="(Igual no cartão)"
                maxLength="24"
                value={holderName}
                onChange={this.handleCreditcardtChange}
              />
            </Row>
            <Row>
              <Col
                tv={7}
                desk={7}
                tablet={defaultColSize}
                palm={defaultColSize}
              >
                <Input
                  name="expiration"
                  label="Data de validade"
                  mask="11/11"
                  value={expiration}
                  onChange={this.handleCreditcardtChange}
                />
              </Col>
              <Col
                tv={5}
                desk={5}
                tablet={defaultColSize}
                palm={defaultColSize}
              >
                <Input
                  name="cvv"
                  label="CVV"
                  value={cvv}
                  type="number"
                  mask="111"
                  onChange={this.handleCreditcardtChange}
                  onFocus={this.handleFlipCard}
                  onBlur={this.handleFlipCard}
                />
              </Col>
            </Row>
            {/* {
              installmentsOptions.length &&
              <Row>
                <Dropdown
                  options={installmentsOptions}
                  name="installments"
                  label="Quantidade de Parcelas"
                  value={selectedInstallments.value}
                  onChange={this.handleInstallmentsChange}
                  title="Selecione"
                />
              </Row>
            } */}
            <Row hidden={isBigScreen}>
              <h4 className={theme.amount} >
                Valor a pagar: {formatToBRL(amount)}
              </h4>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }

  renderBoleto () {
    const { theme, paymentMethods, amount } = this.props
    const { discount } = paymentMethods
      .find(payment => payment.type === 'boleto')

    return (
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
                formatToBRL(discountParser(discount.type, discount.value, amount)) :
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
    )
  }

  render () {
    const { selectedPayment } = this.state
    const { paymentMethods } = this.props

    const renders = {
      boleto: this.renderBoleto.bind(this),
      creditcard: this.renderCreditcard.bind(this),
    }

    const paymentOptions = paymentMethods.map(payment => ({
      title: payment.title,
      subtitle: payment.subtitle,
      value: payment.type,
      content: renders[payment.type](),
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

Payment.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.string,
    grid: PropTypes.string,
    barcodeImg: PropTypes.string,
    boletoAmount: PropTypes.string,
    boletoContainer: PropTypes.string,
  }),
  isBigScreen: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

Payment.defaultProps = {
  theme: {},
  payment: {},
  creditcard: {},
}

export default applyThemr(Payment)
