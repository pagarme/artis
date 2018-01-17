import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../../components/Grid'
import Input from '../../components/Input'
import Billing from '../BillingPage'

const applyThemr = themr('UICustomerPage')
const defaultColSize = 12
const mediumColSize = 6

class Customer extends Component {
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

    const { desktop, theme } = this.props

    return (
      <Grid className={theme.page}>
        <Col
          tv={desktop ? mediumColSize : defaultColSize}
          desk={desktop ? mediumColSize : defaultColSize}
          tablet={desktop ? mediumColSize : defaultColSize}
        >
          <Row>
            <Col
              tv={defaultColSize}
              desk={defaultColSize}
              tablet={defaultColSize}
              palm={defaultColSize}
              className={theme.title}
              alignCenter
            >
              { this.props.title }
            </Col>
            <Col
              tv={defaultColSize}
              desk={defaultColSize}
              tablet={defaultColSize}
              palm={defaultColSize}
            >
              <Input
                name="name"
                label="Nome"
                hint=""
                value={name}
                placeholder="Digite seu nome"
                onChange={this.handleInputChange}
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
                name="email"
                label="E-mail"
                hint=""
                value={email}
                placeholder="Digite seu e-mail"
                onChange={this.handleInputChange}
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
                name="documentNumber"
                label="CPF"
                hint=""
                mask="111.111.111-11"
                value={documentNumber}
                placeholder="Digite seu CPF"
                onChange={this.handleInputChange}
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
                name="phoneNumber"
                label="DDD + Telefone"
                hint=""
                mask="(11) 11111-1111"
                value={phoneNumber}
                placeholder="Digite seu telefone"
                onChange={this.handleInputChange}
              />
            </Col>
          </Row>
        </Col>
        {desktop &&
          <Col
            tv={mediumColSize}
            desk={mediumColSize}
            tablet={mediumColSize}
          >
            <Billing
              title="Endereço de Cobrança"
              isDesktop
            />
          </Col>
        }
      </Grid>
    )
  }
}

Customer.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  desktop: PropTypes.bool.isRequired,
}

Customer.defaultProps = {
  theme: {},
}

export default applyThemr(Customer)
