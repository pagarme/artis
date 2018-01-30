import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'
import PaymentCard from 'react-payment-card-component'
import ReactGA from 'react-ga'
import { pick, prop, propOr } from 'ramda'

import { Grid, Row, Col } from './../components/Grid'
import SegmentedSwitch from './../components/SegmentedSwitch'
import Input from './../components/Input'
import Dropdown from './../components/Dropdown'
import Button from './../components/Button'
import { amountBRLParse } from './../utils/parsers'
import discountParser from './../utils/discountParser'
import installmentsData from './../utils/installments'
import Barcode from './../images/barcode.svg'
import calculate from './../utils/calculateInstallments'

const applyThemr = themr('UIPaymentPage')

const checkRenderPaymentMethod = (name, { value }) => (value === name)

const defaultColSize = 12
const mediumColSize = 6
const defaultCardNumber = '•••• •••• •••• ••••'
const defaultCvv = '•••'
const defaultExpirationDate = 'MM/AA'
const defaultCardName = 'Nome Completo'

const getProp = {
  cardNumber: propOr('', 'cardNumber'),
  name: propOr('', 'name'),
  dateValidate: propOr('', 'dataValidate'),
  cvv: propOr('', 'cvv'),
  selectedInstallments: (
    installments,
    selectedInstallments,
    defaultInstallments
  ) => installments[selectedInstallments || (defaultInstallments - 1) || 0],
}

class Payment extends Component {
  constructor (props) {
    super(props)

    const {
      payment,
      paymentMethods,
      creditcard,
      boleto,
      amount,
    } = this.props

    const paymentMethodsSupported = {
      creditcard: {
        value: 'creditcard',
        title: 'Cartão de Crédito',
        subtitle: prop('subtitle', creditcard) || '',
        render: this.renderCreditcard.bind(this),
      },
      boleto: {
        value: 'boleto',
        title: 'Boleto bancário',
        subtitle: prop('subtitle', boleto) || '',
        render: this.renderBoleto.bind(this),
      },
    }

    const paymentOptions = paymentMethods.map(
      option => paymentMethodsSupported[option]
    )

    const installmentsOptions = calculate(creditcard, installmentsData, amount)

    this.state = {
      cardNumber: getProp.cardNumber(payment),
      name: getProp.name(payment),
      dateValidate: getProp.dateValidate(payment),
      cvv: getProp.cvv(payment),
      selectedInstallments: getProp.selectedInstallments(
        installmentsOptions,
        payment.selectedInstallments,
        creditcard.defaultInstallments
      ),
      paymentOptions,
      installmentsOptions,
      selected: paymentOptions[0],
      nameEmail: '',
      email: '',
      flipped: false,
      barcode: '',
      showEmailForm: false,
    }

    this.flipCard = this.flipCard.bind(this)
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
      'dateValidate',
      'selectedInstallments',
    ], this.state)

    this.props.handlePageChange(paymentData, 'payment')
  }

  handleSwitchChange (selected) {
    this.setState({ selected })
  }

  handleInstallmentsChange (value) {
    this.setState({ selectedInstallments: value })
  }

  handleInputChange (e) {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  flipCard () {
    this.setState(({ flipped }) => ({ flipped: !flipped }))
  }

  handleGenerateBoleto () {
    ReactGA.event({
      category: 'Boleto',
      action: 'Create Boleto',
    })

    this.setState({
      barcode: '12345 00006 00007  00000 00008 9 10110000012134',
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
      this.toggleSendByEmail()
    }
  }

  renderAmount () {
    const { theme, amount } = this.props

    return (
      <h4 className={theme.amount} >
        Valor a pagar: {amountBRLParse(amount)}
      </h4>
    )
  }

  renderCreditcard () {
    const {
      cardNumber,
      name,
      expiration,
      cvv,
      selectedInstallments,
      flipped,
      installmentsOptions,
    } = this.state

    const { theme, isBigScreen } = this.props

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
            number={cardNumber || defaultCardNumber}
            cvv={cvv || defaultCvv}
            holderName={name || defaultCardName}
            expiration={expiration || defaultExpirationDate}
            flipped={flipped}
          />
          { this.renderAmount() }
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
                onFocus={this.flipCard}
                onBlur={this.flipCard}
              />
            </Col>
          </Row>
          {
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
          }
          <Row hidden={isBigScreen}>
            { this.renderAmount() }
          </Row>
        </Col>
      </Row>
    )
  }

  renderGenerateBoleto () {
    const {
      barcode,
    } = this.state

    const {
      theme,
      boleto,
      amount,
    } = this.props

    let discountAmount

    if (boleto.discount) {
      const { type, value } = boleto.discount

      discountAmount = discountParser(type, value, amount)
    }

    return (
      <Col
        tv={mediumColSize}
        desk={mediumColSize}
        tablet={mediumColSize}
        palm={defaultColSize}
      >
        <div className={theme.generateBoletoContainer} >
          <img src={Barcode} alt="barcode" className={theme.barcodeImg} />
          {!barcode && <Button
            fill="outline"
            className={theme.generateBoleto}
            onClick={this.handleGenerateBoleto}
            size="small"
          >
            Gerar Boleto
          </Button>}
          {barcode && <p className={theme.barcode} >{barcode}</p>}
          <h4 className={
            classNames(
              theme.amount,
              theme.boletoAmount,
            )
          }
          >
            Valor a pagar:
            {
              discountAmount ?
                amountBRLParse(discountAmount) :
                amountBRLParse(amount)
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

  renderOptions () {
    const {
      barcode,
    } = this.state

    const { theme } = this.props

    return (
      <Fragment>
        <Row>
          <Col
            tv={defaultColSize}
            desk={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
          >
            <Button
              textAlign="left"
              relevance="low"
              fill="double"
              disabled={!barcode}
              full
              size="extra-large"
              className={theme.actionButton}
            >
              Salvar arquivo
            </Button>
          </Col>
        </Row>
        <Row>
          <Col
            tv={defaultColSize}
            desk={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
          >
            <Button
              relevance="low"
              textAlign="left"
              fill="double"
              disabled={!barcode}
              full
              size="extra-large"
              onClick={this.toggleSendByEmail}
              className={theme.actionButton}
            >
              Encaminhar por e-mail
            </Button>
          </Col>
        </Row>
        <Row>
          <Col
            tv={defaultColSize}
            desk={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
          >
            <Button
              relevance="low"
              textAlign="left"
              fill="double"
              disabled={!barcode}
              full
              size="extra-large"
              className={theme.actionButton}
              onClick={this.handleCopyBarCode}
            >
              Copiar código de barras
            </Button>
          </Col>
        </Row>
      </Fragment>
    )
  }

  renderBoletoOptions () {
    const {
      barcode,
      showEmailForm,
    } = this.state

    const { theme, isBigScreen } = this.props

    return (
      <Col
        tv={mediumColSize}
        desk={mediumColSize}
        tablet={mediumColSize}
        palm={defaultColSize}
        className={theme.optionsContainer}
      >
        { showEmailForm ? this.renderEmailForm() : this.renderOptions() }
        <Row hidden={isBigScreen} >
          <Col
            tv={defaultColSize}
            desk={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
          >
            { this.renderAmount() }
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
    } = this.state

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

  renderPaymentOptions () {
    const { paymentOptions, selected } = this.state

    return paymentOptions.map(({ value, render }) => (
      <Fragment key={value}>
        { checkRenderPaymentMethod(value, selected) && render() }
      </Fragment>
    ))
  }

  render () {
    const {
      paymentOptions,
      selected,
    } = this.state

    const { theme } = this.props

    return (
      <Grid className={theme.grid}>
        <Row>
          <SegmentedSwitch
            onChange={this.handleSwitchChange}
            items={paymentOptions}
            selected={selected}
            name="paymentOptions"
          />
        </Row>
        { this.renderPaymentOptions() }
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
  payment: PropTypes.shape({
    cardNumber: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    name: PropTypes.string,
    dateValidate: PropTypes.string,
    cvv: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    selectedInstallments: PropTypes.string,
  }).isRequired,
  amount: PropTypes.number.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
  boleto: PropTypes.shape({
    subtitle: PropTypes.string,
    instructions: PropTypes.string,
    discount: PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.number,
    }),
    expirationAt: PropTypes.string,
  }),
  creditcard: PropTypes.shape({
    subtitle: PropTypes.string,
    brands: PropTypes.arrayOf(PropTypes.string),
    maxInstallments: PropTypes.number,
    interestRate: PropTypes.number,
    freeInstallments: PropTypes.number,
    defaultInstallments: PropTypes.number,
  }),
  handlePageChange: PropTypes.func.isRequired,
}

Payment.defaultProps = {
  theme: {},
  payment: {},
  boleto: {},
  creditcard: {},
}

export default applyThemr(Payment)
