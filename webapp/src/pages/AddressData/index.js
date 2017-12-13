import React, { Component } from 'react'
import {
  string,
} from 'prop-types'

import classNames from 'classnames'

import { Grid, Row, Col } from '../../components/Grid'
import Input from '../../components/Input'
import Dropdown from '../../components/Dropdown'

const defaultColSize = 12
const smallColSize = 4
const bigColSize = 8

const options = [
  {
    name: 'Acre',
    value: 'AC',
  },
  {
    name: 'Alagoas',
    value: 'AL',
  },
  {
    name: 'Amapá',
    value: 'AP',
  },
  {
    name: 'Amazonas',
    value: 'AM',
  },
  {
    name: 'Bahia',
    value: 'BA',
  },
  {
    name: 'Ceará',
    value: 'CE',
  },
  {
    name: 'Distrito Federal',
    value: 'DF',
  },
  {
    name: 'Espírito Santo',
    value: 'ES',
  },
  {
    name: 'Goiás',
    value: 'GO',
  },
  {
    name: 'Maranhão',
    value: 'MA',
  },
  {
    name: 'Mato Grosso',
    value: 'MT',
  },
  {
    name: 'Mato Grosso do Sul',
    value: 'MS',
  },
  {
    name: 'Minas Gerais',
    value: 'MG',
  },
  {
    name: 'Pará',
    value: 'PA',
  },
  {
    name: 'Paraíba',
    value: 'PB',
  },
  {
    name: 'Paraná',
    value: 'PR',
  },
  {
    name: 'Pernambuco',
    value: 'PE',
  },
  {
    name: 'Piauí',
    value: 'PI',
  },
  {
    name: 'Rio de Janeiro',
    value: 'RJ',
  },
  {
    name: 'Rio Grande do Norte',
    value: 'RN',
  },
  {
    name: 'Rio Grande do Sul',
    value: 'RS',
  },
  {
    name: 'Rondônia',
    value: 'RO',
  },
  {
    name: 'Roraima',
    value: 'RR',
  },
  {
    name: 'Santa Catarina',
    value: 'SC',
  },
  {
    name: 'São Paulo',
    value: 'SP',
  },
  {
    name: 'Sergipe',
    value: 'SE',
  },
  {
    name: 'Tocantins',
    value: 'TO',
  },
]

class AddressData extends Component {
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

    return (
      <div className={classNames(this.props.className, this.props.active)}>
        <Grid>
          <Row>
            <Col
              tv={defaultColSize}
              desk={defaultColSize}
              tablet={defaultColSize}
              palm={defaultColSize}
            >
              <Input
                name="cep"
                label="CEP"
                hint="Os dados seguintes serão completados quando o CEP for digitado"
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
                hint=""
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
                label="UF"
                value={state}
                onChange={this.handleStateChange}
                title="UF"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

AddressData.propTypes = {
  className: string,
  active: string,
}

AddressData.defaultProps = {
  className: '',
  active: '',
}

export default AddressData
