import React from 'react'
import {
  number,
  string,
  func,
} from 'prop-types'
import LockIcon from 'react-icons/lib/md/lock-outline'

import { Grid, Row, Col } from '../Grid'
import Button from '../Button'
import style from './style.css'

const formatCurrency = value =>
  (value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })

const Footer = ({ total, buttonText, buttonClick, companyName }) => (
  <footer>
    <Grid>
      <Row>
        <Col desk={8} tv={8} tablet={8} palm={12}>
          <div className={style.total}>
            Valor a pagar:
            <span className={style.value}>
              {formatCurrency(total)}
            </span>
          </div>
        </Col>
        <Col desk={4} tv={4} tablet={4} palm={12}>
          <Button
            base="dark"
            relevance="high"
            onClick={buttonClick}
            className={style.button}
          >
            {buttonText}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col
          desk={6}
          tv={6}
          tablet={6}
          palm={12}
          className={style.safe}
        >
          <LockIcon />
          Ambiente Seguro
        </Col>
        <Col
          desk={6}
          tv={6}
          tablet={6}
          palm={12}
          className={style.powered}
        >
          Powered by { companyName }
        </Col>
      </Row>
    </Grid>
  </footer>
)

Footer.propTypes = {
  total: number.isRequired,
  buttonText: string.isRequired,
  buttonClick: func.isRequired,
  companyName: string.isRequired,
}

export default Footer
