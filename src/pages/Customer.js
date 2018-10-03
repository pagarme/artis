import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  allPass,
  always,
  dissoc,
  cond,
  contains,
  isEmpty,
  merge,
  path,
  pipe,
  prop,
  propOr,
  replace,
} from 'ramda'

import {
  FormInput,
  ThemeConsumer,
} from 'former-kit'

import { NavigationBar, Form } from '../components'

import {
  isCpf,
  isCnpj,
  isEmail,
  isFormValid,
  minLength,
  maxLength,
  required,
} from '../utils/validations'
import { addPageInfo } from '../redux/actions'

const consumeTheme = ThemeConsumer('UICustomerPage')

const defaultCustomerInfo = {
  documentNumber: '',
  email: '',
  name: '',
  phoneNumber: '',
}

const clean = replace(/[^0-9]/g, '')

const documentValidationsAndMasks = {
  CPF: {
    mask: '111.111.111-11',
    validation: isCpf,
  },
  CNPJ: {
    mask: '11.111.111/1111-11',
    validation: isCnpj,
  },
}

const isCNPJ = contains('CNPJ')
const cnpjConfig = {
  documentLabel: 'CNPJ',
  document: 'CNPJ',
}

const isCPF = contains('CPF')
const cpfConfig = {
  documentLabel: 'CPF',
  document: 'CPF',
}

const isCPFAndCNPJ = allPass([isCPF, isCNPJ])
const cpfAndCNPJ = {
  documentLabel: 'CPF/CNPJ',
  document: 'CPF',
}

const getAllowedDocuments = propOr(['CPF', 'CNPJ'], 'allowedDocuments')

const getDocumentConfig = pipe(
  getAllowedDocuments,
  cond([
    [isCPFAndCNPJ, always(cpfAndCNPJ)],
    [isCPF, always(cpfConfig)],
    [isCNPJ, always(cnpjConfig)],
  ])
)

class CustomerPage extends Component {
  constructor (props) {
    super(props)

    const { customer } = props

    const documentConfigs = getDocumentConfig(customer)

    this.state = { ...customer, ...documentConfigs }

    this.setTextInputRef = (element) => {
      this.firstInput = element
    }
  }

  componentDidMount () {
    const { callbacks, customer } = this.props
    const onEnter = prop('onEnter', callbacks)

    if (onEnter && isEmpty(customer)) {
      onEnter()
    }

    this.firstInput.focus()
  }

  changePress = 0 // eslint-disable-line react/sort-comp

  componentWillUnmount () {
    const { customer, callbacks, handlePageChange } = this.props
    const onExit = prop('onExit', callbacks)

    if (onExit && isEmpty(customer)) {
      onExit()
    }

    handlePageChange({
      page: 'customer',
      pageInfo: this.state,
    })
  }

  handleChangeForm = (values, errors) => {
    this.setState({
      ...dissoc('documentNumber', values),
      formValid: isFormValid(errors),
    })
  }

  handleFormSubmit = (values, errors) => {
    this.setState({
      formValid: isFormValid(errors),
    })

    this.props.handleSubmit(values, errors)
  }

  handleDocumentNumber = (event) => {
    const { documentLabel } = this.state
    let document = 'CPF'
    let value = path(['target', 'value'], event)

    if (documentLabel === 'CPF/CNPJ') {
      const hasCPFLength = clean(value).length >= 11

      if (hasCPFLength) {
        this.changePress += 1
      } else {
        this.changePress = 0
      }

      if (hasCPFLength && this.changePress > 1) {
        document = 'CNPJ'
        value = `${value}${event.key}`
      }
    }

    this.setState({
      document,
      documentNumber: value, // eslint-disable-line react/no-unused-state
    })
  }

  render () {
    const {
      theme,
      customer,
      enableCart,
    } = this.props

    const { document, documentLabel } = this.state

    const { mask, validation } = documentValidationsAndMasks[document]

    return (
      <Form
        data={merge(defaultCustomerInfo, customer)}
        className={theme.customerForm}
        onChange={this.handleChangeForm}
        onSubmit={this.handleFormSubmit}
        customErrorProp="error"
        validation={{
          name: [
            required,
            maxLength(30),
          ],
          email: [
            required,
            isEmail,
            maxLength(30),
          ],
          documentNumber: [
            required,
            value => (validation(value) ? `${documentLabel} inválido` : false),
          ],
          phoneNumber: [
            required,
            minLength(10),
            maxLength(11),
          ],
        }}
      >
        <h2 className={theme.title}>
          Olá, precisamos dos seus dados básicos
        </h2>
        <div className={theme.content}>
          <FormInput
            label="Qual seu nome?"
            name="name"
            placeholder="Digite seu nome"
            inputRef={this.setTextInputRef}
          />
          <FormInput
            label="E-mail"
            name="email"
            placeholder="Digite seu e-mail"
          />
          <FormInput
            label={documentLabel}
            mask={mask}
            name="documentNumber"
            onKeyUp={this.handleDocumentNumber}
            placeholder={`Digite seu ${documentLabel}`}
          />
          <FormInput
            label="DDD + Telefone"
            mask="(11) 11111-1111"
            name="phoneNumber"
            placeholder="Digite seu telefone"
          />
        </div>
        <footer className={theme.footer}>
          <NavigationBar
            enableCart={enableCart}
            formValid={!this.state.formValid}
            nextTitle="Continuar"
          />
        </footer>
      </Form>
    )
  }
}

CustomerPage.propTypes = {
  theme: PropTypes.shape({
    title: PropTypes.string,
    customerForm: PropTypes.string,
    content: PropTypes.string,
    footer: PropTypes.string,
  }),
  customer: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    documentNumber: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  callbacks: PropTypes.shape({
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
  }),
  enableCart: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

CustomerPage.defaultProps = {
  theme: {},
  customer: {},
  callbacks: {},
  enableCart: false,
}

const mapStateToProps = ({ pageInfo }) => ({
  customer: pageInfo.customer,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
})(consumeTheme(CustomerPage))
