import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import Form from 'react-vanilla-form'
import {
  merge,
  omit,
  isNil,
  reject,
  isEmpty,
  applySpec,
  pathOr,
  pick,
} from 'ramda'
import {
  Button,
  Grid,
  Row,
  Col,
} from 'former-kit'

import {
  Input,
  Dropdown,
} from '../components'

import RadioGroup from '../components/RadioGroup'

import options from '../utils/data/states'
import BillingIcon from '../images/map-pin.svg'
import removeMask from '../utils/helpers/removeMask'
import getAddress from '../utils/helpers/getAddress'

import { addPageInfo } from '../actions'
import {
  required,
  isNumber,
  minLength,
  maxLength,
} from '../utils/validations'

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

const shippingInfo = applySpec({
  shippingStreet: pathOr('', ['street']),
  shippingNumber: pathOr('', ['number']),
  shippingComplement: pathOr('', ['complement']),
  shippingNeighborhood: pathOr('', ['neighborhood']),
  shippingCity: pathOr('', ['city']),
  shippingState: pathOr('', ['state']),
  shippingZipcode: pathOr('', ['zipcode']),
})

class AddressesPage extends Component {
  constructor (props) {
    super(props)

    const { billing, shipping } = props

    this.state = {
      ...billing,
      ...shippingInfo(shipping),
      sameAddressForShipping: billing.sameAddressForShipping || 'true',
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (
      prevState.sameAddressForShipping === 'true' &&
      this.state.sameAddressForShipping === 'false') {
      this.shippingZipcodeInput.focus()

      this.setState({ formValid: removeMask(this.state.shippingZipcode).length >= 8 }) // eslint-disable-line
    }
  }

  componentWillUnmount () {
    const {
      sameAddressForShipping,
    } = this.state

    const billingAddress = pick([
      'street',
      'number',
      'complement',
      'neighborhood',
      'city',
      'state',
      'zipcode',
      'sameAddressForShipping',
      'formValid',
    ], this.state)

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
    const zipcode = removeMask(value)

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

  shippingZipcodeRef = (input) => {
    this.shippingZipcodeInput = input
  }

  handleChangeForm = (values, errors) => {
    this.setState((prevState) => {
      let updatedShippingAddress = {}

      const validatedErrors = omit(values.sameAddressForShipping === 'true'
        ? ['shippingStreet',
          'shippingNumber',
          'shippingComplement',
          'shippingNeighborhood',
          'shippingCity',
          'shippingState',
          'shippingZipcode']
        : [], reject(isNil, errors))

      const formValid = isEmpty(validatedErrors)
        && removeMask(values.zipcode || '').length >= 8

      if (
        prevState.sameAddressForShipping === 'true' &&
        values.sameAddressForShipping === 'false') {
        updatedShippingAddress = {
          shippingStreet: '',
          shippingNumber: '',
          shippingComplement: '',
          shippingNeighborhood: '',
          shippingCity: '',
          shippingState: '',
          shippingZipcode: '',
        }
      }

      return {
        ...values,
        ...updatedShippingAddress,
        formValid,
      }
    })
  }

  render () {
    const { sameAddressForShipping } = this.state
    const {
      theme,
      base,
      isBigScreen,
    } = this.props

    return (
      <Form
        data={this.state}
        onChange={this.handleChangeForm}
        onSubmit={this.props.handleSubmit}
        customErrorProp="error"
        validation={{
          zipcode: [
            required,
            minLength(8),
            maxLength(8),
          ],
          number: [
            required,
            isNumber,
            minLength(1),
            maxLength(5),
          ],
          street: [
            required,
            minLength(10),
            maxLength(40),
          ],
          neighborhood: [
            required,
            minLength(4),
            maxLength(15),
          ],
          city: [
            required,
            minLength(4),
            maxLength(25),
          ],
          state: [
            required,
            maxLength(19),
          ],
          shippingZipcode: [
            required,
            minLength(8),
            maxLength(8),
          ],
          shippingNumber: [
            required,
            isNumber,
            minLength(1),
            maxLength(5),
          ],
          shippingStreet: [
            required,
            minLength(10),
            maxLength(40),
          ],
          shippingNeighborhood: [
            required,
            minLength(4),
            maxLength(15),
          ],
          shippingCity: [
            required,
            minLength(4),
            maxLength(25),
          ],
          shippingState: [
            required,
            maxLength(19),
          ],
        }}
      >
        <Grid
          className={
            classNames(theme[base], theme.page)
          }
        >
          <Row
            stretch
            className={theme.alignCenter}
          >
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
              palm={defaultColSize}
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
              <Row>
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
                  tv={mediumColSize}
                  desk={mediumColSize}
                  tablet={mediumColSize}
                  palm={mediumColSize}
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
                tv={mediumColSize}
                desk={mediumColSize}
                tablet={mediumColSize}
                palm={defaultColSize}
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
                    inputRef={this.shippingZipcodeRef}
                    onAutocomplete={this.handleZipcodeChange}
                  />
                </Row>
                <Row>
                  <Input
                    base={base}
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
                <Row>
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
                  >
                    <Dropdown
                      base={base}
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
              align={'end'}
            >
              <Button
                size="extra-large"
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
