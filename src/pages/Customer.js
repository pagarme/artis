import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import Form from 'react-vanilla-form'
import { isEmpty, reject, isNil } from 'ramda'

import {
  Grid,
  Row,
  Col,
  Button,
  Input,
} from '../components'

import {
  required,
  isEmail,
  minLength,
  maxLength,
  cpf,
} from '../utils/validations'
import { addPageInfo } from '../actions'

import CustomerIcon from '../images/avatar-line.svg'

const smallColSize = 4
const mediumColSize = 7
const bigColSize = 8
const defaultColSize = 12

const applyThemr = themr('UICustomerPage')

class CustomerPage extends Component {
  constructor (props) {
    super(props)

    const { customer = {} } = props

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

  renderCustomerForm () {
    const { theme, base } = this.props

    return (
      <Grid>
        <Row className={theme.title} alignCenter>
          <CustomerIcon className={theme.titleIcon} />
          Dados pessoais
        </Row>
        <Row>
          <Col
            tv={defaultColSize}
            desk={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
          >
            <Input
              base={base}
              name="name"
              label="Nome"
              placeholder="Digite seu nome"
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
            <Input
              base={base}
              name="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
            />
          </Col>
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
              name="documentNumber"
              label="CPF"
              mask="111.111.111-11"
              placeholder="Digite seu CPF"
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
              name="phoneNumber"
              label="DDD + Telefone"
              mask="(11) 11111-1111"
              placeholder="Digite seu telefone"
            />
          </Col>
        </Row>
      </Grid>
    )
  }

  render () {
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
            cpf,
          ],
          phoneNumber: [
            required,
            minLength(10),
            maxLength(11),
          ],
        }}
      >
        <Grid
          className={
            classNames(theme[base], theme.page)
          }
        >
          <Col
            tv={sizeWithDesktop}
            desk={sizeWithDesktop}
            tablet={sizeWithDesktop}
          >
            { this.renderCustomerForm() }
          </Col>
          <Col
            desk={defaultColSize}
            tv={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
            alignEnd
          >
            <Button
              base={base}
              size="extra-large"
              relevance="normal"
              type="submit"
              className={theme.button}
              disabled={!this.state.formValid}
              full={!isBigScreen}
            >
              Confirmar
            </Button>
          </Col>
        </Grid>
      </Form>
    )
  }
}

CustomerPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
    titleIcon: PropTypes.string,
    light: PropTypes.string,
    dark: PropTypes.string,
  }),
  base: PropTypes.string,
  isBigScreen: PropTypes.bool.isRequired,
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

const mapStateToProps = ({ screenSize, pageInfo }) => ({
  isBigScreen: screenSize.isBigScreen,
  customer: pageInfo.customer,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
})(applyThemr(CustomerPage))
