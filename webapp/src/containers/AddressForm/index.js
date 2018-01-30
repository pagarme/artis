import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../../components/Grid'
import Input from '../../components/Input'
import Dropdown from '../../components/Dropdown'
import Button from '../../components/Button'

import getAddress from '../../utils/getAddress'
import removeZipcodeMask from '../../utils/removeZipcodeMask'
import isBigScreen from '../../utils/isBigScreen'

const applyThemr = themr('UIAddressForm')

const mediumColSize = 6
const smallColSize = 4
const oneQuarterColSize = 3
const tinyColSize = 2

const defaultAddress = {
  street: '',
  streetNumber: '',
  streetComplement: '',
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
    this.handleStreetNumberInputRef = this.handleStreetNumberInputRef.bind(this)
  }

  handleStateChange (value) {
    this.setState({ state: value })
  }

  handleInputChange (e) {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  handleStreetNumberInputRef (input) {
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
      streetNumber,
      complementary,
      neighborhood,
      city,
      state,
      zipcodeError,
    } = this.state

    const { options, visible, onCancel, theme } = this.props

    return (
      <div
        className={
          classNames({
            [theme.hidden]: !visible,
          })
        }
      >
        <Grid>
          <Row className={theme.title}>
            Cadastrar novo endereço
          </Row>
          <Row className={theme.addressForm}>
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
              palm={mediumColSize}
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
              palm={mediumColSize}
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
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
              palm={mediumColSize}
            >
              <Input
                name="street"
                label="Logradouro"
                hint="Rua, Av, Praça ou Travessa"
                value={street}
                placeholder="Digite o logradouro"
                onChange={this.handleInputChange}
              />
            </Col>
            <Col
              tv={tinyColSize}
              desk={tinyColSize}
              tablet={tinyColSize}
              palm={tinyColSize}
            >
              <Input
                inputRef={this.handleStreetNumberInputRef}
                name="streetNumber"
                label="Nº"
                value={streetNumber}
                placeholder="Digite o número"
                onChange={this.handleInputChange}
              />
            </Col>
            <Col
              tv={smallColSize}
              desk={smallColSize}
              tablet={smallColSize}
              palm={smallColSize}
            >
              <Input
                name="complementary"
                label="Complemento"
                hint=""
                value={complementary}
                placeholder="Digite o complemento do endereço"
                onChange={this.handleInputChange}
              />
            </Col>
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
              palm={mediumColSize}
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
              palm={smallColSize}
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
              palm={tinyColSize}
            >
              <Dropdown
                options={options}
                name="state"
                label="Estado"
                value={state}
                onChange={this.handleStateChange}
                title="Selecione"
              />
            </Col>
          </Row>
          <Row
            className={theme.buttonsWrapper}
            alignEnd
          >
            <Col
              tv={oneQuarterColSize}
              desk={oneQuarterColSize}
              tablet={oneQuarterColSize}
              palm={mediumColSize}
            >
              <Button
                size={'extra-large'}
                fill="outline"
                className={classNames({
                  [theme.actionButton]: !isBigScreen,
                })}
                full
                onClick={onCancel.bind(this)}
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
                className={classNames({
                  [theme.actionButton]: !isBigScreen,
                })}
                full
                size={'extra-large'}
              >
                Cadastrar
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

AddressForm.defaultProps = {
  visible: false,
  options: [],
  theme: {},
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
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })),
}

export default applyThemr(AddressForm)
