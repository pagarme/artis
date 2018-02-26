import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import ReactGA from 'react-ga'
import { pick } from 'ramda'
import { connect } from 'react-redux'

import { Grid, Row, Col, Input, Dropdown, Button } from '../../components'

import getAddress from '../../utils/helpers/getAddress'
import removeZipcodeMask from '../../utils/helpers/removeZipcodeMask'

const applyThemr = themr('UIAddressForm')

const bigColSize = 12
const mediumColSize = 6
const smallColSize = 4
const oneQuarterColSize = 3
const tinyColSize = 2

const defaultAddress = {
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: 'placeholder',
}

class AddressForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      zipcode: '',
      zipcodeError: '',
      ...defaultAddress,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this)
    this.handleZipcodeBlur = this.handleZipcodeBlur.bind(this)
    this.numberInputRef = this.numberInputRef.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.cleanState = this.cleanState.bind(this)
  }

  handleCancel () {
    this.cleanState()
    this.props.onCancel()
  }

  handleConfirm () {
    const address = pick([
      'name',
      'zipcode',
      'street',
      'number',
      'complement',
      'neighborhood',
      'city',
      'state',
    ], this.state)

    ReactGA.event({
      category: 'Shipping',
      action: 'Add new address',
    })

    this.cleanState()
    this.props.onConfirm(address)
  }

  cleanState () {
    this.setState({
      name: '',
      zipcode: '',
      zipcodeError: '',
      ...defaultAddress,
    })
  }

  handleStateChange (value) {
    this.setState({ state: value })
  }

  handleInputChange (e) {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  numberInputRef (input) {
    this.streetNumberInput = input
  }

  handleZipcodeChange (e) {
    const { value } = e.target
    const zipcode = removeZipcodeMask(value)

    if (zipcode.length === 8) {
      this.autocompleteAddress(zipcode)
    }

    this.setState({ zipcode: value })
  }

  handleZipcodeBlur () {
    this.setState({ zipcodeError: '' })
  }

  autocompleteAddress (zipcode) {
    const updateAddress = (address) => {
      this.setState({
        ...address,
        zipcodeError: '',
      })

      this.streetNumberInput.focus()
    }

    const handleError = error =>
      this.setState({
        ...defaultAddress,
        zipcodeError: error.message,
      })

    getAddress(zipcode)
      .then(updateAddress)
      .catch(handleError)
  }

  render () {
    const {
      name,
      zipcode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipcodeError,
    } = this.state

    const {
      options,
      visible,
      theme,
      isBigScreen,
    } = this.props

    return (
      <div
        className={
          classNames({
            [theme.hidden]: !visible,
          })
        }
      >
        <Grid overflowVisible>
          <Row className={theme.title}>
            <span>
              Cadastrar novo endereço
            </span>
          </Row>
          <Row
            className={theme.addressForm}
            overflowVisible
          >
            <Row noPadding={!isBigScreen}>
              <Col
                tv={mediumColSize}
                desk={mediumColSize}
                tablet={mediumColSize}
                palm={bigColSize}
              >
                <Input
                  name="name"
                  label="Nome do endereço"
                  value={name}
                  placeholder="Digite um nome para este endereço"
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col
                tv={mediumColSize}
                desk={mediumColSize}
                tablet={mediumColSize}
                palm={bigColSize}
              >
                <Input
                  name="zipcode"
                  label="CEP"
                  value={zipcode}
                  mask="11111-111"
                  error={zipcodeError}
                  placeholder="Digite o CEP"
                  onChange={this.handleZipcodeChange}
                  onBlur={this.handleZipcodeBlur}
                />
              </Col>
            </Row>
            <Row noPadding={!isBigScreen}>
              <Col
                tv={mediumColSize}
                desk={mediumColSize}
                tablet={mediumColSize}
                palm={bigColSize}
              >
                <Input
                  name="street"
                  label="Endereço"
                  value={street}
                  placeholder="Digite o endereço"
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col
                tv={tinyColSize}
                desk={tinyColSize}
                tablet={tinyColSize}
                palm={smallColSize}
              >
                <Input
                  inputRef={this.numberInputRef}
                  name="number"
                  label="Nº"
                  value={number}
                  placeholder="Digite o número"
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col
                tv={smallColSize}
                desk={smallColSize}
                tablet={smallColSize}
                palm={8}
              >
                <Input
                  name="complement"
                  label="Complemento"
                  value={complement}
                  placeholder="Digite o complemento do endereço"
                  onChange={this.handleInputChange}
                />
              </Col>
            </Row>
            <Row
              noPadding={!isBigScreen}
              overflowVisible
            >
              <Col
                tv={mediumColSize}
                desk={mediumColSize}
                tablet={mediumColSize}
                palm={bigColSize}
              >
                <Input
                  name="neighborhood"
                  label="Bairro"
                  hint=""
                  value={neighborhood}
                  placeholder="Digite o bairro"
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col
                tv={smallColSize}
                desk={smallColSize}
                tablet={smallColSize}
                palm={8}
              >
                <Input
                  name="city"
                  label="Cidade"
                  value={city}
                  placeholder="Digite a cidade"
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col
                tv={tinyColSize}
                desk={tinyColSize}
                tablet={tinyColSize}
                palm={smallColSize}
                overflowVisible
              >
                <Dropdown
                  options={options}
                  name="state"
                  label="Estado"
                  value={state}
                  onChange={this.handleStateChange}
                />
              </Col>
            </Row>
            <Row
              className={theme.buttonsWrapper}
              alignEnd
              noPadding={!isBigScreen}
            >
              <Col
                tv={oneQuarterColSize}
                desk={oneQuarterColSize}
                tablet={oneQuarterColSize}
                palm={mediumColSize}
                alignEnd
              >
                <Button
                  id="address-form-cancel-btn"
                  size={'extra-large'}
                  fill="outline"
                  full
                  onClick={this.handleCancel}
                  className={theme.actionButton}
                >
                  Cancelar
                </Button>
              </Col>
              <Col
                tv={oneQuarterColSize}
                desk={oneQuarterColSize}
                tablet={oneQuarterColSize}
                palm={mediumColSize}
              >
                <Button
                  id="address-form-confirm-btn"
                  full
                  size={'extra-large'}
                  onClick={this.handleConfirm}
                  className={theme.actionButton}
                >
                  Cadastrar
                </Button>
              </Col>
            </Row>
          </Row>
        </Grid>
      </div>
    )
  }
}

AddressForm.propTypes = {
  theme: PropTypes.shape({
    hidden: PropTypes.string,
    title: PropTypes.string,
    addressForm: PropTypes.string,
    cancelButton: PropTypes.string,
  }),
  visible: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })),
  isBigScreen: PropTypes.bool.isRequired,
}

AddressForm.defaultProps = {
  visible: false,
  options: [],
  theme: {},
}

const mapStateToProps = ({ screenSize }) => ({
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps)(applyThemr(AddressForm))
