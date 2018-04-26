import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import Form from 'react-vanilla-form'
import {
  isEmpty,
  isNil,
  merge,
  omit,
  reject,
} from 'ramda'
import {
  Button,
  Grid,
  Row,
  Col,
  Switch,
  FormInput,
  ThemeConsumer,
} from 'former-kit'

import options from '../utils/data/states'
import BillingIcon from '../images/map-pin.svg'
import { removeMask } from '../utils/masks/'
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

const consumeTheme = ThemeConsumer('UIAddressesPage')

class AddressesPage extends Component {
  constructor (props) {
    super(props)

    const { billing } = props

    this.state = {
      ...billing,
      sameAddressForShipping: billing.sameAddressForShipping || true,
    }
  }

  componentWillUnmount () {
    this.props.handlePageChange({
      page: 'billing',
      pageInfo: this.state,
    })
  }

  autocompleteAddress (zipcode) {
    const updateAddress = (address) => {
      const newZipcode = address.cep

      const newAddress = merge(
        omit(['cep'], address),
        {
          zipcode: newZipcode,
          number: '',
          complement: '',
          isSearchingCPF: false,
        }
      )

      this.setState(newAddress)

      // this.numberInput.focus()
    }

    const handleError = error =>
      this.setState({
        error: error.message,
        isSearchingCPF: false,
      })

    this.setState({ isSearchingCPF: true }, () => (
      getAddress(zipcode)
        .then(updateAddress)
        .catch(handleError)
    ))
  }

  handleNumberInputRef = (input) => {
    this.numberInput = input
  }

  shippingZipcodeRef = (input) => {
    this.shippingZipcodeInput = input
  }

  handleSameAddressChange = (value) => {
    this.setState({ sameAddressForShipping: value })
  }

  handleChangeForm = (values, errors) => {
    const {
      zipcode: oldZipcode,
    } = this.state

    this.setState({
      ...values,
      formValid: isEmpty(reject(isNil, errors)),
    }, () => {
      if (values.zipcode !== oldZipcode &&
        removeMask(values.zipcode).length === 8) {
        this.autocompleteAddress(values.zipcode)
      }
    })
  }

  render () {
    const {
      sameAddressForShipping,
      isSearchingCPF,
    } = this.state

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
        }}
      >
        <Grid
          className={
            classNames(theme[base], theme.page)
          }
        >
          <Col
            tv={mediumColSize}
            desk={mediumColSize}
            tablet={mediumColSize}
            palm={defaultColSize}
          >
            <div className={theme.addressForm}>
              <h2 className={theme.title}>
                <BillingIcon className={theme.titleIcon} />
                Endereço de cobrança
              </h2>
              <FormInput
                disabled={isSearchingCPF}
                name="zipcode"
                label="CEP"
                mask="11111-111"
                placeholder="Digite o CEP"
                hint={isSearchingCPF
                  ? 'Procurando dados do endereço'
                  : 'Digite o CEP para buscar os dados de endereço'
                }
              />
              <FormInput
                disabled={isSearchingCPF}
                name="street"
                label="Rua"
                placeholder="Digite o endereço"
              />
              <FormInput
                inputRef={this.handleNumberInputRef}
                name="number"
                label="Nº"
                placeholder="Digite o número"
                type="number"
              />
              <FormInput
                name="complement"
                label="Complemento"
                placeholder="Digite o complemento do endereço"
              />
              <FormInput
                disabled={isSearchingCPF}
                name="neighborhood"
                label="Bairro"
                placeholder="Digite o bairro"
              />
              <FormInput
                disabled={isSearchingCPF}
                name="city"
                label="Cidade"
                placeholder="Digite a cidade"
              />
              <FormInput
                disabled={isSearchingCPF}
                options={options}
                name="state"
                label="UF"
                placeholder="Escolha a UF"
              />
            </div>
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
                <Switch
                  checked={sameAddressForShipping}
                  onChange={this.handleSameAddressChange}
                  strings={{
                    on: 'Sim',
                    off: 'Não',
                  }}
                />
              </Col>
            </Row>
          </Col>
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
}

AddressesPage.defaultProps = {
  theme: {},
  billing: {},
  base: 'dark',
}

const mapStateToProps = ({ screenSize, pageInfo }) => ({
  billing: pageInfo.billing,
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
})(consumeTheme(AddressesPage))
