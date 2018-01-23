import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../components/Grid'
import Input from '../components/Input'
import BillingPage from './Billing'

import isBigScreen from '../utils/isBigScreen'

const applyThemr = themr('UICustomerPage')
const defaultColSize = 12
const mediumColSize = 6

class CustomerPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      documentNumber: '',
      phoneNumber: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (e) {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render () {
    const {
      name,
      email,
      documentNumber,
      phoneNumber,
    } = this.state

    const { theme } = this.props

    const sizeWithDesktop = isBigScreen
      ? mediumColSize
      : defaultColSize

    return (
      <Grid className={theme.page}>
        <Col
          tv={sizeWithDesktop}
          desk={sizeWithDesktop}
          tablet={sizeWithDesktop}
        >
          <Row className={theme.title} alignCenter>
            { this.props.title }
          </Row>
          <Row>
            <Input
              name="name"
              label="Nome"
              value={name}
              placeholder="Digite seu nome"
              onChange={this.handleInputChange}
            />
          </Row>
          <Row>
            <Input
              name="email"
              label="E-mail"
              value={email}
              placeholder="Digite seu e-mail"
              onChange={this.handleInputChange}
            />
          </Row>
          <Row>
            <Input
              name="documentNumber"
              label="CPF"
              mask="111.111.111-11"
              value={documentNumber}
              placeholder="Digite seu CPF"
              onChange={this.handleInputChange}
            />
          </Row>
          <Row>
            <Input
              name="phoneNumber"
              label="DDD + Telefone"
              mask="(11) 11111-1111"
              value={phoneNumber}
              placeholder="Digite seu telefone"
              onChange={this.handleInputChange}
            />
          </Row>
        </Col>
        {isBigScreen &&
          <Col
            tv={mediumColSize}
            desk={mediumColSize}
            tablet={mediumColSize}
          >
            <BillingPage
              title="Endereço de Cobrança"
              isBigScreen
            />
          </Col>
        }
      </Grid>
    )
  }
}

CustomerPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
}

CustomerPage.defaultProps = {
  theme: {},
}

export default applyThemr(CustomerPage)
