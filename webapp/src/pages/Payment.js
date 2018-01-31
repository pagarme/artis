import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'
import PaymentCard from 'react-payment-card-component'
import ReactGA from 'react-ga'
import { pick } from 'ramda'

import { Grid, Row, Col } from './../components/Grid'
import Switch from './../components/Switch'
import Input from './../components/Input'
import ActionList from './../components/ActionList'
import Button from './../components/Button'

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
        cardNumber: '•••• •••• •••• ••••',
        name: 'Nome Completo',
        expiration: 'MM/AA',
        cvv: '•••',
        flipped: false,
      },
      boleto: {
        barcode: '',
      },
      selectedPayment: 0,
      nameEmail: '',
      email: '',
      showEmailForm: false,
    }

    this.handleFlipCard = this.handleFlipCard.bind(this)
    this.handleSwitchChange = this.handleSwitchChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInstallmentsChange = this.handleInstallmentsChange.bind(this)
    this.handleGenerateBoleto = this.handleGenerateBoleto.bind(this)
    this.handleToggleSendByEmail = this.handleToggleSendByEmail.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillUnmount () {
    const paymentData = pick([
      'cardNumber',
      'name',
      'cvv',
      'expiration',
    ], this.state.creditcard)

    this.props.handlePageChange(paymentData, 'payment')
  }

  handleSwitchChange (choice) {
    this.setState({ selectedPayment: choice })
  }

  handleInputChange (e) {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  handleFlipCard () {
    this.setState(({ flipped }) => ({ flipped: !flipped }))
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

  handleToggleSendByEmail () {
    ReactGA.event({
      category: 'Boleto',
      action: 'Send by email',
    })

    this.setState(({ showEmailForm }) => ({ showEmailForm: !showEmailForm }))
  }

  /* eslint-disable class-methods-use-this */
  handleCopyBarCode () {
    ReactGA.event({
      category: 'Boleto',
      action: 'Copy Bar Code',
    })
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.handleToggleSendByEmail()
    }
  }

  renderCreditcard () {
    const {
      cardNumber,
      name,
      expiration,
      cvv,
      flipped,
    } = this.state

    const { theme, amount, isBigScreen } = this.props

    return (
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
            number={cardNumber}
            cvv={cvv}
            holderName={name}
            expiration={expiration}
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
              onChange={this.handleInputChange}
            />
          </Row>
          <Row>
            <Input
              name="name"
              label="Nome"
              hint="(Igual no cartão)"
              maxLength="24"
              value={name}
              onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
    )
  }

  renderGenerateBoleto () {
    const { barcode } = this.state.boleto
    const { theme, paymentMethods, amount } = this.props
    const { discount } = paymentMethods.find(payment => payment.type === 'boleto')

    return (
      <Col
        tv={mediumColSize}
        desk={mediumColSize}
        tablet={mediumColSize}
        palm={defaultColSize}
      >
        <div className={theme.generateBoletoContainer} >
          <img src={Barcode} alt="barcode" className={theme.barcodeImg} />
          {
            !barcode && <Button
              fill="outline"
              className={theme.generateBoleto}
              onClick={this.handleGenerateBoleto}
              size="small"
            >
              Gerar Boleto
            </Button>
          }
          {
            barcode && <p className={theme.barcode} >{barcode}</p>
          }
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
        </div>
      </Col>
    )
  }

  renderEmailForm () {
    const {
      nameEmail,
      email,
    } = this.state

    const { theme } = this.props

    return (
      <div className={theme.emailForm}>
        <Row>
          <h4 className={theme.emailFormTitle}>
            Encaminhar por e-mail
          </h4>
        </Row>
        <Row>
          <Input
            name="nameEmail"
            label="Digite seu nome - opcional"
            value={nameEmail}
            onChange={this.handleInputChange}
          />
        </Row>
        <Row>
          <Input
            name="email"
            label="Digite o e-mail"
            value={email}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleInputChange}
          />
        </Row>
      </div>
    )
  }

  renderBoletoOptions () {
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
          ? this.renderEmailForm()
          : <ActionList buttons={[
            { text: 'Salvar arquivo', disabled: !barcode },
            { text: 'Encaminhar por e-mail', disabled: !barcode, onClick: this.handleToggleSendByEmail },
            { text: 'Copiar código de barras', disabled: !barcode },
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

  renderBoleto () {
    const {
      barcode,
    } = this.state.boleto

    if (!this.props.isBigScreen && !barcode) {
      return this.renderGenerateBoleto()
    }

    if (!this.props.isBigScreen && barcode) {
      return this.renderBoletoOptions()
    }

    return (
      <Row>
        { this.renderGenerateBoleto() }
        { this.renderBoletoOptions() }
      </Row>
    )
  }

  render () {
    const { selectedPayment } = this.state
    const { theme, paymentMethods } = this.props

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
      <Grid className={theme.grid}>
        <Row>
          <Switch
            onChange={this.handleSwitchChange}
            items={paymentOptions}
            selected={selectedPayment}
            name="paymentOptions"
          />
        </Row>
      </Grid>
    )
  }
}

Payment.propTypes = {
  theme: PropTypes.shape({
    amount: PropTypes.string,
    cardContainer: PropTypes.string,
    cardForm: PropTypes.string,
    grid: PropTypes.string,
    barcode: PropTypes.string,
    barcodeImg: PropTypes.string,
    generateBoleto: PropTypes.string,
    generateBoletoContainer: PropTypes.string,
    boletoAmount: PropTypes.string,
    boletoContainer: PropTypes.string,
    optionsContainer: PropTypes.string,
    emailForm: PropTypes.string,
    emailFormTitle: PropTypes.string,
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
