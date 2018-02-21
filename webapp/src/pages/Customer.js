import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'

import { Grid, Row, Col, Input, Form } from '../components'

import BillingPage from './Billing'
import { addPageInfo, disableFooterButton } from '../actions'

import {
  requiredValidation,
  lettersValidation,
  emailValidation,
  cpfValidation,
  phoneValidation,
  maxLengthValidation,
  minLengthValidation,
} from '../utils/validators/'

const applyThemr = themr('UICustomerPage')
const defaultColSize = 12
const mediumColSize = 6

class CustomerPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ...props.customer,
    }

    this.handleOnChange = this.handleOnChange.bind(this)
  }

  componentWillUnmount () {
    this.props.handlePageChange('customer', this.state)
  }

  handleSubmit(event) { // eslint-disable-line
    console.log('onSubmit customer') // eslint-disable-line
  }

  handleOnChange(data, errors) { // eslint-disable-line
    let existsError = false

    if (errors) {
      Object.keys(errors).forEach((key) => {
        if (errors[key]) existsError = true
      })
    }

    this.props.disableFooterButton(existsError)
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
          <Form
            onSubmit={this.handleSubmit}
            onChange={this.handleOnChange}
            validation={{
              name: [
                requiredValidation,
                lettersValidation,
                maxLengthValidation(100),
              ],
              email: [
                requiredValidation,
                emailValidation,
                maxLengthValidation(100),
              ],
              documentNumber: [
                requiredValidation,
                cpfValidation,
                minLengthValidation(11),
                maxLengthValidation(11),
              ],
              phoneNumber: [
                requiredValidation,
                phoneValidation,
                maxLengthValidation(11),
              ],
            }}
            data={{
              name,
              email,
              documentNumber,
              phoneNumber,
            }}
          >
            <input type="submit" />
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
                  name="email"
                  label="E-mail"
                  hint=""
                  placeholder="Digite seu e-mail"
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
                  placeholder="Digite seu CPF"
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
                  placeholder="Digite seu telefone"
                />
              </Col>
            </Row>
          </Form>
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
  disableFooterButton: PropTypes.func.isRequired,
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
  disableFooterButton: isDisable => dispatch(disableFooterButton(isDisable)),
})


export default connect(mapStateToProps, mapDispatchToProps)(applyThemr(CustomerPage))
