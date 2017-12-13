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

const formatCurrency = (value = 0) =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })

const palmColSize = 12
const valueColSize = 8
const buttonColSize = 4
const defaultColSize = 6

const Footer = ({ total, buttonText, buttonClick, companyName }) => (
  <footer>
    <Grid>
      <Row>
        <Col
          desk={valueColSize}
          tv={valueColSize}
          tablet={valueColSize}
          palm={palmColSize}
          alignEnd
        >
          <div className={style.total}>
            Valor a pagar:
            <span className={style.value}>
              {formatCurrency(total)}
            </span>
          </div>
        </Col>
        <Col
          desk={buttonColSize}
          tv={buttonColSize}
          tablet={buttonColSize}
          palm={palmColSize}
        >
          <Button
            size="extra-large"
            relevance="normal"
            onClick={buttonClick}
            className={style.button}
          >
            {buttonText}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col
          desk={defaultColSize}
          tv={defaultColSize}
          tablet={defaultColSize}
          palm={palmColSize}
          className={style.safe}
        >
          <LockIcon />
          Ambiente Seguro
        </Col>
        <Col
          desk={defaultColSize}
          tv={defaultColSize}
          tablet={defaultColSize}
          palm={palmColSize}
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
