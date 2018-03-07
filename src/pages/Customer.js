import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import Form from 'react-vanilla-form'

import {
  Grid,
  Row,
  Col,
  Button,
  Input,
} from '../components'

import titleIcon from '../images/avatar-line.svg'

import { required, isEmail } from '../utils/validations'

import { addPageInfo } from '../actions'

const smallColSize = 4
const bigColSize = 8

const applyThemr = themr('UIGeneralForm')
const defaultColSize = 12
const mediumColSize = 7

class IdentificationPage extends Component {
  constructor (props) {
    super(props)

    const { customer = {} } = props

    this.state = { ...customer }

    this.renderCustomerForm = this.renderCustomerForm.bind(this)
    this.handleChangeForm = this.handleChangeForm.bind(this)
  }

  handleChangeForm (values) {
    this.setState(values)
  }

  renderCustomerForm () {
    const { theme } = this.props

    return (
      <React.Fragment>
        <Row className={theme.title} alignCenter>
          <img src={titleIcon} alt="Customer icon" className={theme.titleIcon} />
          Dados pessoais
        </Row>
        <Row>
          <Input
            name="name"
            label="Nome"
            placeholder="Digite seu nome"
          />
        </Row>
        <Row>
          <Input
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
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
              name="phoneNumber"
              label="DDD + Telefone"
              mask="(11) 11111-1111"
              placeholder="Digite seu telefone"
            />
          </Col>
        </Row>
      </React.Fragment>
    )
  }

  render () {
    const { theme, isBigScreen } = this.props

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
          name: [required],
          email: [required, isEmail],
          documentNumber: [required],
          phoneNumber: [required],
        }}
      >
        <Grid className={theme.page}>
          <Col
            tv={sizeWithDesktop}
            desk={sizeWithDesktop}
            tablet={sizeWithDesktop}
          >
            { this.renderCustomerForm() }
          </Col>
          <Row>
            <Col
              desk={defaultColSize}
              tv={defaultColSize}
              tablet={defaultColSize}
              palm={defaultColSize}
              alignEnd
            >
              <Button
                id="footer-confirm-btn"
                size="extra-large"
                relevance="normal"
                type="submit"
                className={theme.button}
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

IdentificationPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
    titleIcon: PropTypes.string,
  }),
  isBigScreen: PropTypes.bool.isRequired,
  customer: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    documentNumber: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
}

IdentificationPage.defaultProps = {
  theme: {},
  customer: {},
}

const mapStateToProps = ({ screenSize, pageInfo }) => ({
  isBigScreen: screenSize.isBigScreen,
  customer: pageInfo.customer,
})

export default connect(mapStateToProps, {
  handlePageChange: addPageInfo,
})(applyThemr(IdentificationPage))
