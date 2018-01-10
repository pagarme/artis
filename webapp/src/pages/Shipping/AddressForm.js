import React, { Component } from 'react'
import { bool } from 'prop-types'
import classNames from 'classnames'

import { Grid, Row, Col } from '../../components/Grid'
import Input from '../../components/Input'
import Dropdown from '../../components/Dropdown'
import options from '../Billing/states'
import Button from '../../components/Button'

import defaultStyle from '../style.css'
import style from './style.css'

const largeColSize = 12
const mediumColSize = 6
const smallColSize = 4
const tinyColSize = 2

class AddressForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      zipcode: '',
      street: '',
      streetNumber: '',
      complementary: '',
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
      name,
      zipcode,
      street,
      streetNumber,
      complementary,
      neighborhood,
      city,
      state,
    } = this.state

    return (
      <div
        className={
          classNames({
            [style.hidden]: !this.props.visible,
          })
        }
      >
        <Grid>
          <Row>
            <Col
              tv={largeColSize}
              desk={largeColSize}
              tablet={largeColSize}
              palm={largeColSize}
              className={defaultStyle.title}
              alignLeft
            >
              Cadastrar novo endereço
            </Col>
          </Row>
        </Grid>
        <div className={style.addressForm}>
          <Grid>
            <Row>
              <Col
                tv={mediumColSize}
                desk={mediumColSize}
                tablet={mediumColSize}
                palm={mediumColSize}
              >
                <Input
                  name="name"
                  label="Nome do endereço"
                  value={name}
                  placeholder="Digite um nome para este endereço"
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col
                tv={mediumColSize}
                desk={mediumColSize}
                tablet={mediumColSize}
                palm={mediumColSize}
              >
                <Input
                  name="zipcode"
                  label="CEP"
                  value={zipcode}
                  mask="11111-111"
                  placeholder="Digite o CEP"
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col
                tv={mediumColSize}
                desk={mediumColSize}
                tablet={mediumColSize}
                palm={mediumColSize}
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
              <Col
                tv={tinyColSize}
                desk={tinyColSize}
                tablet={tinyColSize}
                palm={tinyColSize}
              >
                <Input
                  name="streetNumber"
                  label="Nº"
                  value={streetNumber}
                  placeholder="Digite o número"
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col
                tv={smallColSize}
                desk={smallColSize}
                tablet={smallColSize}
                palm={smallColSize}
              >
                <Input
                  name="complementary"
                  label="Complemento"
                  hint=""
                  value={complementary}
                  placeholder="Digite o complemento do endereço"
                  onChange={this.handleInputChange}
                />
              </Col>
              <Col
                tv={mediumColSize}
                desk={mediumColSize}
                tablet={mediumColSize}
                palm={mediumColSize}
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
              <Col
                tv={smallColSize}
                desk={smallColSize}
                tablet={smallColSize}
                palm={smallColSize}
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
                tv={tinyColSize}
                desk={tinyColSize}
                tablet={tinyColSize}
                palm={tinyColSize}
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
            <Row>
              <Col
                tv={largeColSize}
                desk={largeColSize}
                tablet={largeColSize}
                palm={largeColSize}
                alignEnd
              >
                <Button
                  size="small"
                  fill="outline"
                  relevance="low"
                  className={style.cancelButton}
                >
                  Cancelar
                </Button>
                <Button
                  size="small"
                  relevance="low"
                >
                  Cadastrar
                </Button>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

AddressForm.defaultProps = {
  visible: false,
}

AddressForm.propTypes = {
  visible: bool,
}

export default AddressForm
