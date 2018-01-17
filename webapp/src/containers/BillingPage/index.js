import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../../components/Grid'
import Input from '../../components/Input'
import Dropdown from '../../components/Dropdown'

import options from '../../helpers/states'

const applyThemr = themr('UIBillingPage')

const defaultColSize = 12
const smallColSize = 4
const bigColSize = 8

class Billing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cep: '',
      street: '',
      streetNumber: '',
      streetComplement: '',
      neighborhood: '',
      city: '',
      state: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
  }

  handleStateChange (value) {
    this.setState({ state: value })
  }

  handleInputChange (e) {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render () {
    const {
      cep,
      street,
      streetNumber,
      streetComplement,
      neighborhood,
      city,
      state,
    } = this.state

    const { theme, isDesktop } = this.props

    return (
      <Grid className={
        classNames(theme.page, {
          [theme.noMarginTop]: isDesktop,
        })}
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
              name="cep"
              label="CEP"
              mask="11111-111"
              value={cep}
              placeholder="Digite o CEP"
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
              name="street"
              label="Logradouro"
              hint="Rua, Av, Praça ou Travessa"
              value={street}
              placeholder="Digite o logradouro"
              onChange={this.handleInputChange}
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
              name="streetNumber"
              label="Nº"
              hint=""
              value={streetNumber}
              placeholder="Digite o número"
              onChange={this.handleInputChange}
            />
          </Col>
          <Col
            tv={bigColSize}
            desk={bigColSize}
            tablet={bigColSize}
            palm={bigColSize}
          >
            <Input
              name="streetComplement"
              label="Complemento"
              hint=""
              value={streetComplement}
              placeholder="Digite o complemento do endereço"
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
              name="neighborhood"
              label="Bairro"
              hint=""
              value={neighborhood}
              placeholder="Digite o bairro"
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col
            tv={bigColSize}
            desk={bigColSize}
            tablet={bigColSize}
            palm={bigColSize}
          >
            <Input
              name="city"
              label="Cidade"
              hint=""
              value={city}
              placeholder="Digite a cidade"
              onChange={this.handleInputChange}
            />
          </Col>
          <Col
            tv={smallColSize}
            desk={smallColSize}
            tablet={smallColSize}
            palm={smallColSize}
          >
            <Dropdown
              options={options}
              name="state"
              label="Estado"
              value={state}
              onChange={this.handleStateChange}
              title="Selecione"
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

Billing.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  isDesktop: PropTypes.string,
}

Billing.defaultProps = {
  theme: {},
  isDesktop: false,
}

export default applyThemr(Billing)
