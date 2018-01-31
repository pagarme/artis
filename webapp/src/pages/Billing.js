import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../components/Grid'
import Input from '../components/Input'
import Dropdown from '../components/Dropdown'

import options from '../utils/states'
import getAddress from '../utils/getAddress'
import removeZipcodeMask from '../utils/removeZipcodeMask'

const applyThemr = themr('UIBillingPage')

const smallColSize = 4
const bigColSize = 8

const defaultAddress = {
  street: '',
  streetNumber: '',
  streetComplement: '',
  neighborhood: '',
  city: '',
  state: 'placeholder',
}

class BillingPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...defaultAddress,
      zipcode: '',
      zipcodeError: '',
    }

    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStreetNumberInputRef = this.handleStreetNumberInputRef.bind(this)
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this)
    this.handleZipcodeBlur = this.handleZipcodeBlur.bind(this)
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
      zipcode,
      zipcodeError,
      street,
      streetNumber,
      streetComplement,
      neighborhood,
      city,
      state,
    } = this.state

    const { theme, isBigScreen } = this.props

    return (
      <Grid className={
        classNames(theme.page, {
          [theme.noMarginTop]: isBigScreen,
        })}
      >
        <Row className={theme.title}>
          {this.props.title}
        </Row>
        <Row>
          <Input
            name="zipcode"
            label="CEP"
            mask="11111-111"
            value={zipcode}
            error={zipcodeError}
            placeholder="Digite o CEP"
            onChange={this.handleZipcodeChange}
            onBlur={this.handleZipcodeBlur}
          />
        </Row>
        <Row>
          <Input
            name="street"
            label="Endereço"
            hint="Rua, Av, Praça ou Travessa"
            value={street}
            placeholder="Digite o endereço"
            onChange={this.handleInputChange}
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
              inputRef={this.handleStreetNumberInputRef}
              name="streetNumber"
              label="Nº"
              hint=""
              value={streetNumber}
              placeholder="Digite o número"
              onChange={this.handleInputChange}
            />
          </Col>
          <Col
            tv={bigColSize}
            desk={bigColSize}
            tablet={bigColSize}
            palm={bigColSize}
          >
            <Input
              name="streetComplement"
              label="Complemento"
              hint=""
              value={streetComplement}
              placeholder="Digite o complemento do endereço"
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Input
            name="neighborhood"
            label="Bairro"
            hint=""
            value={neighborhood}
            placeholder="Digite o bairro"
            onChange={this.handleInputChange}
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
              hint=""
              value={city}
              placeholder="Digite a cidade"
              onChange={this.handleInputChange}
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
              label="Estado"
              value={state}
              onChange={this.handleStateChange}
              title="Selecione"
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

BillingPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  isBigScreen: PropTypes.bool,
}

BillingPage.defaultProps = {
  theme: {},
  isBigScreen: false,
}

export default applyThemr(BillingPage)

