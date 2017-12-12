import React from 'react'
import {
  string,
} from 'prop-types'

import UserIcon from 'react-icons/lib/fa/user'
import classNames from 'classnames'

import { Grid, Row, Col } from '../../components/Grid'
import Input from '../../components/Input'

const CustomerData = ({ className, active }) => (
  <div className={classNames(className, active)}>
    <Grid>
      <Row>
        <Col tv={12} desk={12} tablet={12} palm={12}>
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
        <Col tv={12} desk={12} tablet={12} palm={12}>
          <Input
            name="email"
            label="E-mail"
            hint=""
            placeholder="Digite seu e-mail"
          />
        </Col>
        <Col tv={12} desk={12} tablet={12} palm={12}>
          <Input
            name="documentNumber"
            label="CPF"
            hint=""
            placeholder="Digite seu CPF"
          />
        </Col>
        <Col tv={12} desk={12} tablet={12} palm={12}>
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
