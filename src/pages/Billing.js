import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  allPass,
  any,
  isEmpty,
  merge,
  omit,
  prop,
} from 'ramda'
import {
  FormInput,
  Switch,
  ThemeConsumer,
} from 'former-kit'

import options from '../utils/data/states'
import { removeMask } from '../utils/masks/'
import getAddress from '../utils/helpers/getAddress'
import { addPageInfo, toggleSameAddressForShipping } from '../actions'
import {
  isFormValid,
  isNumber,
  maxLength,
  minLength,
  required,
} from '../utils/validations'
import { NavigationBar, Form } from '../components'

const consumeTheme = ThemeConsumer('UIAddressesPage')

const defaultBillingAddress = {
  city: '',
  complement: '',
  number: '',
  state: '',
  street: '',
  zipcode: '',
}

const isBillingInformationsComplete = allPass(
  [
    prop('city'),
    prop('number'),
    prop('state'),
    prop('street'),
    prop('zipcode'),
  ]
)


const isAllItemsTangible = (cartItems) => {
  const tangible = prop('tangible')

  return any(tangible, cartItems)
}

class BillingPage extends Component {
  constructor (props) {
    super(props)

    const { billing } = props

    this.state = {
      ...merge(defaultBillingAddress, billing),
    }

    this.setTextInputRef = (element) => {
      this.firstInput = element
    }
  }

  componentWillMount () {
    if (isBillingInformationsComplete(this.state)) {
      this.setState({
        formValid: true,
      })
    }
  }

  componentDidMount () {
    const { callbacks, billing } = this.props
    const onEnter = prop('onEnter', callbacks)

    if (onEnter && isEmpty(billing)) {
      onEnter()
    }

    this.firstInput.focus()
  }

  componentWillUnmount () {
    const { callbacks, billing, handlePageChange } = this.props
    const onExit = prop('onExit', callbacks)

    if (onExit && isEmpty(billing)) {
      onExit()
    }

    handlePageChange({
      page: 'billing',
      pageInfo: this.state,
    })

    if (this.props.sameAddressForShipping) {
      handlePageChange({
        page: 'shipping',
        pageInfo: this.state,
      })
    }
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

      this.numberInput.focus()
    }

    const handleError = () =>
      this.setState({
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

  handleSameAddressChange = () => {
    this.props.handleToggleSameAddressForShipping()
  }

  handleChangeZipcode = (event) => {
    const zipcode = event.target.value

    if (removeMask(zipcode).length === 8) {
      this.autocompleteAddress(zipcode)
    }
  }

  handleChangeForm = (values, errors) => {
    this.setState({
      ...values,
      formValid: isFormValid(errors),
    })
  }

  render () {
    const {
      isSearchingCPF,
    } = this.state

    const {
      antifraude,
      cartItems,
      theme,
      enableCart,
      handlePreviousButton,
      sameAddressForShipping,
    } = this.props

    const showSwitch = antifraude && (isAllItemsTangible(cartItems) || cartItems.length === 0) //eslint-disable-line

    return (
      <Form
        data={this.state}
        className={theme.addressForm}
        onChange={this.handleChangeForm}
        onSubmit={this.props.handleSubmit}
        customErrorProp="error"
        validation={{
          zipcode: [
            required,
            maxLength(8),
            minLength(8),
          ],
          number: [
            required,
            isNumber,
            maxLength(5),
          ],
          complement: [
            maxLength(65),
          ],
          street: [
            required,
            maxLength(40),
          ],
          city: [
            required,
            minLength(4),
            maxLength(25),
          ],
          state: [
            required,
            minLength(2),
            maxLength(2),
          ],
        }}
      >
        <h2 className={theme.title}>
          Qual é seu endereço de cobrança?
        </h2>
        <div className={theme.content}>
          <FormInput
            disabled={isSearchingCPF}
            label="CEP"
            mask="11111-111"
            name="zipcode"
            onChange={this.handleChangeZipcode}
            inputRef={this.setTextInputRef}
          />
          <FormInput
            disabled={isSearchingCPF}
            label="Rua"
            name="street"
            placeholder="Digite o endereço"
          />
          <div className={theme.inputGroup}>
            <FormInput
              className={theme.fieldNumber}
              inputRef={this.handleNumberInputRef}
              label="Nº"
              name="number"
              type="number"
            />
            <FormInput
              className={theme.fieldComplement}
              label="Complemento"
              name="complement"
            />
          </div>
          <div className={theme.inputGroup}>
            <FormInput
              className={theme.fieldCity}
              disabled={isSearchingCPF}
              label="Cidade"
              name="city"
              placeholder="Digite a cidade"
            />
            <FormInput
              className={theme.fieldState}
              disabled={isSearchingCPF}
              label="Estado"
              name="state"
              options={options}
              placeholder="Escolha a UF"
            />
          </div>
          {
            showSwitch &&
            <div className={theme.inputGroup}>
              <p className={theme.switchLabel}>Entregar no mesmo endereço?</p>
              <Switch
                checked={sameAddressForShipping}
                onChange={this.handleSameAddressChange}
                strings={{
                  on: 'Sim',
                  off: 'Não',
                }}
              />
            </div>
          }
        </div>
        <footer className={theme.footer}>
          <NavigationBar
            enableCart={enableCart}
            handlePreviousButton={handlePreviousButton}
            formValid={!this.state.formValid}
            prevTitle="Ops, voltar"
            nextTitle="Continuar"
          />
        </footer>
      </Form>
    )
  }
}

BillingPage.propTypes = {
  antifraude: PropTypes.bool.isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  theme: PropTypes.shape({
    addressForm: PropTypes.string,
    content: PropTypes.string,
    footer: PropTypes.string,
    fieldNumber: PropTypes.string,
    fieldComplement: PropTypes.string,
    fieldCity: PropTypes.string,
    fieldState: PropTypes.string,
    inputGroup: PropTypes.string,
    switchLabel: PropTypes.string,
  }),
  callbacks: PropTypes.shape({
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
  }),
  enableCart: PropTypes.bool,
  handlePageChange: PropTypes.func.isRequired,
  handleToggleSameAddressForShipping: PropTypes.func.isRequired,
  handlePreviousButton: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  billing: PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    complement: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
  }),
  sameAddressForShipping: PropTypes.bool.isRequired,
}

BillingPage.defaultProps = {
  billing: {},
  callbacks: {},
  enableCart: false,
  handlePreviousButton: null,
  theme: {},
}

const mapStateToProps = ({ pageInfo, addresses }) => ({
  billing: pageInfo.billing,
  sameAddressForShipping: addresses.sameAddressForShipping,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
  handleToggleSameAddressForShipping: toggleSameAddressForShipping,
})(consumeTheme(BillingPage))
