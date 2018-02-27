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
  Button,
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
const mediumColSize = 6

class IdentificationPage extends Component {
  constructor (props) {
    super(props)

    const { customer = {}, billing = {} } = props

    this.state = { customer, billing }

    this.handleNumberInputRef = this.handleNumberInputRef.bind(this)
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this)
    this.autocompleteAddress = this.autocompleteAddress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderCustomerForm = this.renderCustomerForm.bind(this)
    this.renderBillingForm = this.renderBillingForm.bind(this)
  }

  componentWillUnmount () {
    this.props.handlePageChange('customer', this.state)
  }

  handleZipcodeChange (e) {
    const { value } = e.target
    const zipcode = removeZipcodeMask(value)

    if (zipcode.length === 8) {
      this.autocompleteAddress(zipcode)
    }
  }

  handleSubmit (values) {
    this.props.handlePageChange('customer', {
      customer: pick(
        ['name', 'email', 'documentNumber', 'phoneNumber'],
        values
      ),
    })

    this.props.handlePageChange('billing', {
      billing: pick(
        [
          'zipcode',
          'street',
          'number',
          'complement',
          'city',
          'state',
          'neighborhood',
        ],
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

      this.setState(prevState => ({
        ...prevState,
        billing: {
          ...newAddress,
        },
      }))

      this.numberInput.focus()
    }

    const handleError = error =>
      this.setState(prevState => ({
        ...prevState,
        error: error.message,
      }))

    getAddress(zipcode)
      .then(updateAddress)
      .catch(handleError)
  }

  handleNumberInputRef (input) {
    this.numberInput = input
  }

  renderCustomerForm () {
    const { theme, isBigScreen } = this.props

    return (
      <Grid className={
        classNames(theme.page, {
          [theme.noMarginTop]: isBigScreen,
        })}
      >
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
          <Input
            name="documentNumber"
            label="CPF"
            mask="111.111.111-11"
            placeholder="Digite seu CPF"
          />
        </Row>
        <Row>
          <Input
            name="phoneNumber"
            label="DDD + Telefone"
            mask="(11) 11111-1111"
            placeholder="Digite seu telefone"
          />
        </Row>
      </Grid>
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
        <Row overflowVisible>
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
            overflowVisible
          >
            <Dropdown
              options={options}
              id="state"
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
        data={merge(this.state.customer, this.state.billing)}
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
          <Col
            tv={mediumColSize}
            desk={mediumColSize}
            tablet={mediumColSize}
          >
            { this.renderBillingForm() }
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
                id="footer-confirm-btn"
                disabled={false}
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
  billing: PropTypes.shape({
    zipcode: PropTypes.string,
    street: PropTypes.string,
    number: PropTypes.string,
    complement: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    neighborhood: PropTypes.string,
  }),
  handlePageChange: PropTypes.func.isRequired,
}

IdentificationPage.defaultProps = {
  theme: {},
  customer: {},
  billing: {},
}

const mapStateToProps = ({ screenSize, pageInfo }) => ({
  isBigScreen: screenSize.isBigScreen,
  customer: pageInfo.customer,
  billing: pageInfo.billing,
})

const mapDispatchToProps = dispatch => ({
  handlePageChange: (page, pageInfo) => {
    dispatch(addPageInfo({ page, pageInfo }))
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(applyThemr(IdentificationPage))
