import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Form from 'react-vanilla-form'
import { isEmpty, reject, isNil } from 'ramda'
import {
  FormInput,
  ThemeConsumer,
} from 'former-kit'

import {
  NavigationBar,
} from '../components'

import {
  required,
  isEmail,
  minLength,
  maxLength,
  isCpf,
} from '../utils/validations'
import { addPageInfo } from '../actions'

const consumeTheme = ThemeConsumer('UICustomerPage')

class CustomerPage extends Component {
  constructor (props) {
    super(props)

    const { customer } = props

    this.state = { ...customer }
  }

  componentWillUnmount () {
    this.props.handlePageChange({
      page: 'customer',
      pageInfo: this.state,
    })
  }

  handleChangeForm = (values, errors) => {
    this.setState({
      ...values,
      formValid: isEmpty(reject(isNil, errors)),
    })
  }

  handleFormSubmit = (values, errors) => {
    this.setState({
      formValid: isEmpty(reject(isNil, errors)),
    })

    this.props.handleSubmit(values, errors)
  }

  render () {
    const {
      theme,
      customer,
    } = this.props

    return (
      <Form
        data={customer}
        className={theme.customerForm}
        onChange={this.handleChangeForm}
        onSubmit={this.handleFormSubmit}
        customErrorProp="error"
        validation={{
          name: [
            required,
            minLength(10),
            maxLength(30),
          ],
          email: [
            required,
            isEmail,
            minLength(10),
            maxLength(30),
          ],
          documentNumber: [
            required,
            minLength(11),
            maxLength(11),
            isCpf,
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
        <div className={theme.inputsContainer}>
          <FormInput
            name="name"
            label="Qual seu nome?"
            placeholder="Digite seu nome"
          />
          <FormInput
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
          />
          <FormInput
            name="documentNumber"
            label="CPF"
            mask="111.111.111-11"
            placeholder="Digite seu CPF"
          />
          <FormInput
            name="phoneNumber"
            label="DDD + Telefone"
            mask="(11) 11111-1111"
            placeholder="Digite seu telefone"
          />
        </div>
        <div className={theme.buttonContainer}>
          <NavigationBar
            formValid={!this.state.formValid}
            nextTitle="Continuar"
          />
        </div>
      </Form>
    )
  }
}

CustomerPage.propTypes = {
  theme: PropTypes.shape({
    title: PropTypes.string,
    customerForm: PropTypes.string,
    inputsContainer: PropTypes.string,
    buttonContainer: PropTypes.string,
  }),
  customer: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    documentNumber: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

CustomerPage.defaultProps = {
  theme: {},
  customer: {},
  base: 'dark',
}

const mapStateToProps = ({ pageInfo }) => ({
  customer: pageInfo.customer,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
})(consumeTheme(CustomerPage))
