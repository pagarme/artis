import React from 'react'
import {
  string,
} from 'prop-types'

import UserIcon from 'react-icons/lib/fa/user'
import classNames from 'classnames'

import { Grid, Row, Col } from '../../components/Grid'
import Input from '../../components/Input'

const defaultColSize = 12

const CustomerData = ({ className, active }) => (
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
            name="nome"
            label="Nome"
            hint=""
            placeholder="Digite seu nome"
            icon={<UserIcon size={20} />}
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
            placeholder="Digite seu telefone"
          />
        </Col>
      </Row>
    </Grid>
  </div>
)

CustomerData.propTypes = {
  className: string,
  active: string,
}

CustomerData.defaultProps = {
  className: '',
  active: '',
}

export default CustomerData
