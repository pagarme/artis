import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'

import { Grid, Row, Col, Input } from '../components'

import BillingPage from './Billing'
import { addPageInfo } from '../actions'

const applyThemr = themr('UICustomerPage')
const defaultColSize = 12
const mediumColSize = 6

class CustomerPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...props.customer,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillUnmount () {
    this.props.handlePageChange('customer', this.state)
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

    const sizeWithDesktop = this.props.isBigScreen
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
        {this.props.isBigScreen &&
          <Col
            tv={mediumColSize}
            desk={mediumColSize}
            tablet={mediumColSize}
          >
            <BillingPage title="Endereço de Cobrança" />
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
  isBigScreen: PropTypes.bool.isRequired,
  customer: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    documentNumber: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  handlePageChange: PropTypes.func.isRequired,
}

CustomerPage.defaultProps = {
  theme: {},
  billingData: {},
  customer: {},
}

const mapStateToProps = ({ screenSize, pageInfo }) => ({
  isBigScreen: screenSize.isBigScreen,
  customer: pageInfo.customer,
})

const mapDispatchToProps = dispatch => ({
  handlePageChange: (page, pageInfo) => {
    dispatch(addPageInfo({ page, pageInfo }))
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(applyThemr(CustomerPage))
