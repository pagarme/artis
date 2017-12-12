import React from 'react'
import {
  string,
} from 'prop-types'

import classNames from 'classnames'

import { Grid, Row, Col } from '../../components/Grid'
import Input from '../../components/Input'

const defaultColSize = 12
const smallColSize = 4
const bigColSize = 8

const AddressData = ({ className, active }) => (
  <div className={classNames(className, active)}>
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
            placeholder="Digite o CEP"
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
            placeholder="Digite o logradouro"
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
            placeholder="Digite o número"
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
            placeholder="Digite o complemento do endereço"
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
            placeholder="Digite o bairro"
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
            placeholder="Digite a cidade"
          />
        </Col>
        <Col
          tv={smallColSize}
          desk={smallColSize}
          tablet={smallColSize}
          palm={smallColSize}
        >
          <Input
            name="state"
            label="UF"
            hint=""
            placeholder="Digite o estado"
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

AddressData.propTypes = {
  className: string,
  active: string,
}

AddressData.defaultProps = {
  className: '',
  active: '',
}

export default AddressData
