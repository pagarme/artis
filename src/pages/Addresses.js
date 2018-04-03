import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import Form from 'react-vanilla-form'
import { merge, omit, isNil, reject, isEmpty } from 'ramda'
import { RadioGroup } from 'former-kit'

import {
  Grid,
  Row,
  Col,
  Button,
  Input,
  Dropdown,
} from '../components'

import options from '../utils/data/states'
import BillingIcon from '../images/map-pin.svg'
import removeZipcodeMask from '../utils/helpers/removeZipcodeMask'
import getAddress from '../utils/helpers/getAddress'

import { addPageInfo } from '../actions'
import { required, isNumber } from '../utils/validations'

const defaultColSize = 12
const mediumColSize = 6
const smallColSize = 4
const bigColSize = 8

const applyThemr = themr('UIAddressesPage')

const radioOptions = [
  {
    name: 'Sim',
    value: 'true',
  },
  {
    name: 'Não',
    value: 'false',
  },
]

class AddressesPage extends Component {
  constructor (props) {
    super(props)

    const { billing = {}, shipping = {} } = props

    this.state = {
      ...billing,
      shippingStreet: shipping.street,
      shippingNumber: shipping.number,
      shippingComplement: shipping.complement,
      shippingNeighborhood: shipping.neighborhood,
      shippingCity: shipping.city,
      shippingState: shipping.state,
      shippingZipcode: shipping.zipcode,
      sameAddressForShipping: billing.sameAddressForShipping || 'true',
    }
  }

  componentWillUnmount () {
    const {
      sameAddressForShipping,
    } = this.state

    const billingAddress = {
      street: this.state.street,
      number: this.state.number,
      complement: this.state.complement,
      neighborhood: this.state.neighborhood,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      sameAddressForShipping: this.state.sameAddressForShipping,
    }

    this.props.handlePageChange({
      page: 'billing',
      pageInfo: billingAddress,
    })

    if (sameAddressForShipping === 'true') {
      this.props.handlePageChange({
        page: 'shipping',
        pageInfo: billingAddress,
      })
    }

    if (sameAddressForShipping === 'false') {
      this.props.handlePageChange({
        page: 'shipping',
        pageInfo: {
          street: this.state.shippingStreet,
          number: this.state.shippingNumber,
          complement: this.state.shippingComplement,
          neighborhood: this.state.shippingNeighborhood,
          city: this.state.shippingCity,
          state: this.state.shippingState,
          zipcode: this.state.shippingZipcode,
        },
      })
    }
  }

  handleZipcodeChange = (e) => {
    const { name, value } = e.target
    const zipcode = removeZipcodeMask(value)

    if (zipcode.length === 8) {
      this.autocompleteAddress(zipcode, name)
    }
  }

  autocompleteAddress (zipcode, name) {
    const updateAddress = (address) => {
      const newZipcode = address.cep

      if (name.startsWith('shipping')) {
        this.setState({
          shippingStreet: address.street,
          shippingNeighborhood: address.neighborhood,
          shippingCity: address.city,
          shippingState: address.state,
          shippingNumber: '',
          shippingComplement: '',
        })

        this.shippingNumberInput.focus()
      } else {
        const newAddress = merge(
          omit(['cep'], address),
          {
            zipcode: newZipcode,
            number: '',
            complement: '',
          }
        )

        this.setState(newAddress)

        this.numberInput.focus()
      }
    }

    const handleError = error =>
      this.setState({
        error: error.message,
      })

    getAddress(zipcode)
      .then(updateAddress)
      .catch(handleError)
  }

  handleNumberInputRef = (input) => {
    this.numberInput = input
  }

  handleShippingNumberInputRef = (input) => {
    this.shippingNumberInput = input
  }

  handleChangeForm = (values, errors) => {
    this.setState({
      ...values,
      formValid: isEmpty(reject(isNil, errors)),
    })
  }

  render () {
    const { sameAddressForShipping } = this.state
    const { theme, base, isBigScreen } = this.props

    const sizeWithDesktop = isBigScreen
      ? mediumColSize
      : defaultColSize

    return (
      <Form
        data={this.state}
        onChange={this.handleChangeForm}
        onSubmit={this.props.handleSubmit}
        customErrorProp="error"
        validation={{
          zipcode: [required],
          number: [required, isNumber],
          street: [required],
          neighborhood: [required],
          city: [required],
          state: [required],
          shippingZipcode: [required],
          shippingNumber: [required, isNumber],
          shippingStreet: [required],
          shippingNeighborhood: [required],
          shippingCity: [required],
          shippingState: [required],
        }}
      >
        <Grid
          className={
            classNames(theme[base], theme.page)
          }
        >
          <Row alignCenter stretch>
            <Col
              tv={sizeWithDesktop}
              desk={sizeWithDesktop}
              tablet={sizeWithDesktop}
            >
              <Row className={theme.title}>
                <BillingIcon className={theme.titleIcon} />
                Endereço de cobrança
              </Row>
              <Row>
                <Input
                  base={base}
                  name="zipcode"
                  label="CEP"
                  mask="11111-111"
                  placeholder="Digite o CEP"
                  onAutocomplete={this.handleZipcodeChange}
                />
              </Row>
              <Row>
                <Input
                  base={base}
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
                    base={base}
                    inputRef={this.handleNumberInputRef}
                    name="number"
                    label="Nº"
                    placeholder="Digite o número"
                    type="number"
                  />
                </Col>
                <Col
                  tv={bigColSize}
                  desk={bigColSize}
                  tablet={bigColSize}
                  palm={bigColSize}
                >
                  <Input
                    base={base}
                    name="complement"
                    label="Complemento"
                    placeholder="Digite o complemento do endereço"
                  />
                </Col>
              </Row>
              <Row>
                <Input
                  base={base}
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
                    base={base}
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
                    base={base}
                    options={options}
                    name="state"
                    label="UF"
                    placeholder="Escolha a UF"
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
                  <span className={theme.label}>
                  Utilizar este endereço para entrega?
                  </span>
                </Col>
              </Row>
              <Row>
                <Col
                  tv={smallColSize}
                  desk={smallColSize}
                  tablet={smallColSize}
                  palm={smallColSize}
                  className={theme.radio}
                >
                  <RadioGroup
                    name="sameAddressForShipping"
                    options={radioOptions}
                  />
                </Col>
              </Row>
            </Col>
            {
              (sameAddressForShipping && sameAddressForShipping !== 'true') &&
              <Col
                tv={sizeWithDesktop}
                desk={sizeWithDesktop}
                tablet={sizeWithDesktop}
              >
                <Row className={theme.title}>
                  <BillingIcon className={theme.titleIcon} />
                  Endereço de entrega
                </Row>
                <Row>
                  <Input
                    base={base}
                    name="shippingZipcode"
                    label="CEP"
                    mask="11111-111"
                    placeholder="Digite o CEP"
                    onAutocomplete={this.handleZipcodeChange}
                  />
                </Row>
                <Row>
                  <Input
                    name="shippingStreet"
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
                      base={base}
                      inputRef={this.handleShippingNumberInputRef}
                      name="shippingNumber"
                      label="Nº"
                      placeholder="Digite o número"
                      type="number"
                    />
                  </Col>
                  <Col
                    tv={bigColSize}
                    desk={bigColSize}
                    tablet={bigColSize}
                    palm={bigColSize}
                  >
                    <Input
                      base={base}
                      name="shippingComplement"
                      label="Complemento"
                      placeholder="Digite o complemento do endereço"
                    />
                  </Col>
                </Row>
                <Row>
                  <Input
                    base={base}
                    name="shippingNeighborhood"
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
                      base={base}
                      name="shippingCity"
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
                      name="shippingState"
                      label="UF"
                      placeholder="Escolha a UF"
                    />
                  </Col>
                </Row>
              </Col>
            }
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
                size="extra-large"
                relevance="normal"
                type="submit"
                className={theme.button}
                full={!isBigScreen}
                disabled={!this.state.formValid}
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

AddressesPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
    btnAddNewAddress: PropTypes.string,
    label: PropTypes.string,
    light: PropTypes.string,
    dark: PropTypes.string,
  }),
  base: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  isBigScreen: PropTypes.bool.isRequired,
  billing: PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    complement: PropTypes.string,
    neighborhood: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
  }),
  shipping: PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    complement: PropTypes.string,
    neighborhood: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
  }),
}

AddressesPage.defaultProps = {
  theme: {},
  shipping: {},
  billing: {},
  base: 'dark',
}

const mapStateToProps = ({ screenSize, pageInfo }) => ({
  shipping: pageInfo.shipping,
  billing: pageInfo.billing,
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
})(applyThemr(AddressesPage))
