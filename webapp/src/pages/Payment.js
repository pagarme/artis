import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'
import PaymentCard from 'react-payment-card-component'
import ReactGA from 'react-ga'
import { pick } from 'ramda'
import copy from 'copy-to-clipboard'

import { Grid, Row, Col } from './../components/Grid'
import Switch from './../components/Switch'
import Input from './../components/Input'
import ActionList from './../components/ActionList'
import Button from './../components/Button'
import EmailForm from './../containers/EmailForm'

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
      boleto: {
        barcode: '',
      },
      selectedPayment: 0,
      showEmailForm: false,
    }

    this.handleFlipCard = this.handleFlipCard.bind(this)
    this.handleSwitchChange = this.handleSwitchChange.bind(this)
    this.handleCreditcardtChange = this.handleCreditcardtChange.bind(this)
    this.handleGenerateBoleto = this.handleGenerateBoleto.bind(this)
    this.toggleEmailForm = this.toggleEmailForm.bind(this)
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

  handleGenerateBoleto () {
    ReactGA.event({
      category: 'Boleto',
      action: 'Create Boleto',
    })

    this.setState({
      boleto: {
        barcode: '12345 00006 00007  00000 00008 9 10110000012134',
      },
    })
  }

  toggleEmailForm () {
    ReactGA.event({
      category: 'Boleto',
      action: `${this.state.showEmailForm ? 'Close' : 'Open'} send by email modal`,
    })

    this.setState({ showEmailForm: !this.state.showEmailForm })
  }

  /* eslint-disable class-methods-use-this */
  handleCopyBarCode (barcode) {
    ReactGA.event({
      category: 'Boleto',
      action: 'Copy Bar Code',
    })

    copy(barcode)
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
            className={theme.cardContainer}
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
            className={theme.cardForm}
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

  renderGenerateBoleto () {
    const { theme, paymentMethods, amount } = this.props
    const { discount } = paymentMethods.find(payment => payment.type === 'boleto')

    return (
      <Col
        tv={defaultColSize}
        desk={defaultColSize}
        tablet={defaultColSize}
        palm={defaultColSize}
      >
        <div className={theme.generateBoletoContainer} >
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

  renderBoleto () {
    const { boleto, showEmailForm } = this.state
    const { barcode } = boleto
    const { theme, amount, isBigScreen } = this.props

    return (
      <Col
        tv={mediumColSize}
        desk={mediumColSize}
        tablet={mediumColSize}
        palm={defaultColSize}
        className={theme.optionsContainer}
      >
        { showEmailForm
          ? <EmailForm
            handleClose={this.toggleEmailForm}
          />
          : <ActionList buttons={[
            {
              text: 'Salvar arquivo',
              disabled: !barcode,
            },
            {
              text: 'Encaminhar por e-mail',
              disabled: !barcode,
              onClick: this.toggleEmailForm,
            },
            {
              text: 'Copiar código de barras',
              disabled: !barcode,
              onClick: this.handleCopyBarCode
                .bind(this, barcode),
            },
          ]}
          />
        }
        <Row hidden={isBigScreen} >
          <Col
            tv={defaultColSize}
            desk={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
          >
            <h4 className={theme.amount} >
              Valor a pagar: {formatToBRL(amount)}
            </h4>
          </Col>
        </Row>
        <Row hidden={isBigScreen} >
          <Col
            tv={defaultColSize}
            desk={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
          >
            <Button
              relevance="low"
              disabled={!barcode}
              full
              size="extra-large"
            >
              Fechar
            </Button>
          </Col>
        </Row>
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
    amount: PropTypes.string,
    cardContainer: PropTypes.string,
    cardForm: PropTypes.string,
    page: PropTypes.string,
    barcode: PropTypes.string,
    barcodeImg: PropTypes.string,
    generateBoleto: PropTypes.string,
    generateBoletoContainer: PropTypes.string,
    boletoAmount: PropTypes.string,
    boletoContainer: PropTypes.string,
    optionsContainer: PropTypes.string,
  }),
  isBigScreen: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.object).isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

Payment.defaultProps = {
  theme: {},
  payment: {},
  boleto: {},
  creditcard: {},
}

export default applyThemr(Payment)
