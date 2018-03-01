import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import Form from 'react-vanilla-form'
import { merge, pick, omit } from 'ramda'
import classNames from 'classnames'

import {
  Grid,
  Row,
  Col,
  // Button,
  Input,
  Dropdown,
} from '../components'

import titleIcon from '../images/avatar-line.svg'
import options from '../utils/data/states'

import getAddress from '../utils/helpers/getAddress'
import removeZipcodeMask from '../utils/helpers/removeZipcodeMask'
import { required, isNumber, isEmail } from '../utils/validations'

import { addPageInfo } from '../actions'

const smallColSize = 4
const bigColSize = 8

const applyThemr = themr('UIGeneralForm')
const defaultColSize = 12
const mediumColSize = 7

class IdentificationPage extends Component {
  constructor (props) {
    super(props)

    const { customer = {} } = props

    this.state = { ...customer }

    this.handleNumberInputRef = this.handleNumberInputRef.bind(this)
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this)
    this.autocompleteAddress = this.autocompleteAddress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderCustomerForm = this.renderCustomerForm.bind(this)
    this.handleChangeForm = this.handleChangeForm.bind(this)
  }

  componentWillUnmount () {
    this.handleSubmit(this.state)
  }

  handleZipcodeChange (e) {
    const { value } = e.target
    const zipcode = removeZipcodeMask(value)

    if (zipcode.length === 8) {
      this.autocompleteAddress(zipcode)
    }
  }

  handleChangeForm (values) {
    this.setState(values)
  }

  handleSubmit (values) {
    this.props.handlePageChange({
      page: 'customer',
      pageInfo: pick(
        ['name', 'email', 'documentNumber', 'phoneNumber'],
        values
      ),
    })
  }

  autocompleteAddress (zipcode) {
    const updateAddress = (address) => {
      const newZipcode = address.cep

      const newAddress = merge(
        omit(['cep'], address),
        { zipcode: newZipcode }
      )

      this.setState(newAddress)

      this.numberInput.focus()
    }

    const handleError = error =>
      this.setState({
        error: error.message,
      })

    getAddress(zipcode)
      .then(updateAddress)
      .catch(handleError)
  }

  handleNumberInputRef (input) {
    this.numberInput = input
  }

  renderCustomerForm () {
    const { theme } = this.props

    return (
      <React.Fragment>
        <Row className={theme.title} alignCenter>
          <img src={titleIcon} alt="Customer icon" className={theme.titleIcon} />
          Dados pessoais
        </Row>
        <Row>
          <Input
            name="name"
            label="Nome"
            placeholder="Digite seu nome"
          />
        </Row>
        <Row>
          <Input
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
          />
        </Row>
        <Row>
          <Col
            tv={smallColSize}
            desk={smallColSize}
            tablet={smallColSize}
            palm={smallColSize}
          >
            <Input
              name="documentNumber"
              label="CPF"
              mask="111.111.111-11"
              placeholder="Digite seu CPF"
            />
          </Col>
          <Col
            tv={bigColSize}
            desk={bigColSize}
            tablet={bigColSize}
            palm={bigColSize}
          >
            <Input
              name="phoneNumber"
              label="DDD + Telefone"
              mask="(11) 11111-1111"
              placeholder="Digite seu telefone"
            />
          </Col>
        </Row>
      </React.Fragment>
    )
  }

  renderBillingForm () {
    const { theme, isBigScreen } = this.props

    return (
      <Grid className={
        classNames(theme.page, {
          [theme.noMarginTop]: isBigScreen,
        })}
      >
        <Row className={theme.title}>
          <img src={titleIcon} alt="Billing icon" className={theme.titleIcon} />
          Endereço de Cobrança
        </Row>
        <Row>
          <Input
            name="zipcode"
            label="CEP"
            mask="11111-111"
            placeholder="Digite o CEP"
            onAutocomplete={this.handleZipcodeChange}
          />
        </Row>
        <Row>
          <Input
            name="street"
            label="Rua"
            placeholder="Digite o endereço"
          />
        </Row>
        <Row>
          <Col
            tv={smallColSize}
            desk={smallColSize}
            tablet={smallColSize}
            palm={smallColSize}
          >
            <Input
              inputRef={this.handleNumberInputRef}
              name="number"
              label="Nº"
              placeholder="Digite o número"
            />
          </Col>
          <Col
            tv={bigColSize}
            desk={bigColSize}
            tablet={bigColSize}
            palm={bigColSize}
          >
            <Input
              name="complement"
              label="Complemento"
              placeholder="Digite o complemento do endereço"
            />
          </Col>
        </Row>
        <Row>
          <Input
            name="neighborhood"
            label="Bairro"
            placeholder="Digite o bairro"
          />
        </Row>
        <Row>
          <Col
            tv={bigColSize}
            desk={bigColSize}
            tablet={bigColSize}
            palm={bigColSize}
          >
            <Input
              name="city"
              label="Cidade"
              placeholder="Digite a cidade"
            />
          </Col>
          <Col
            tv={smallColSize}
            desk={smallColSize}
            tablet={smallColSize}
            palm={smallColSize}
          >
            <Dropdown
              options={options}
              name="state"
              label="UF"
            />
          </Col>
        </Row>
      </Grid>
    )
  }

  render () {
    const { theme } = this.props

    const sizeWithDesktop = this.props.isBigScreen
      ? mediumColSize
      : defaultColSize

    return (
      <Form
        data={this.state}
        onChange={this.handleChangeForm}
        onSubmit={this.handleSubmit}
        customErrorProp="error"
        validation={{
          name: [required],
          email: [required, isEmail],
          documentNumber: [required],
          phoneNumber: [required],
          zipcode: [required],
          number: [required, isNumber],
          street: [required],
          neighborhood: [required],
          city: [required],
          state: [required],
        }}
      >
        <Grid className={theme.page}>
          <Col
            tv={sizeWithDesktop}
            desk={sizeWithDesktop}
            tablet={sizeWithDesktop}
          >
            { this.renderCustomerForm() }
          </Col>
          {/* <Row>
            <Col
              desk={defaultColSize}
              tv={defaultColSize}
              tablet={defaultColSize}
              palm={defaultColSize}
              alignEnd
            >
              <Button
                id="footer-confirm-btn"
                size="extra-large"
                relevance="normal"
                type="submit"
                className={theme.button}
              >
                Confirmar
              </Button>
            </Col>
          </Row> */}
        </Grid>
      </Form>
    )
  }
}

IdentificationPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
    titleIcon: PropTypes.string,
  }),
  isBigScreen: PropTypes.bool.isRequired,
  customer: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    documentNumber: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  handlePageChange: PropTypes.func.isRequired,
}

IdentificationPage.defaultProps = {
  theme: {},
  customer: {},
}

const mapStateToProps = ({ screenSize, pageInfo }) => ({
  isBigScreen: screenSize.isBigScreen,
  customer: pageInfo.customer,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
})(applyThemr(IdentificationPage))
