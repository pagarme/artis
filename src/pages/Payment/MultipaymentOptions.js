import React from 'react'
import PropTypes from 'prop-types'
import { equals } from 'ramda'
import { themr } from 'react-css-themr'

import {
  Grid,
  Row,
  Col,
  Button,
} from './../../components'

const applyThemr = themr('UIPaymentPage')

const defaultColSize = 12
const mediumColSize = 6

const allowedOptions = [
  {
    paymentType: ['creditcard', 'creditcard'],
    title: '2 cartões de crédito',
    transitionTo: 'MULTIPLE_CREDITCARDS',
  },
  {
    paymentType: ['creditcard', 'boleto'],
    title: 'Cartão de crédito + Boleto',
    transitionTo: 'CREDITCARD_AND_BOLETO',
  },
]

const MultipaymentOptions = ({
  theme,
  transaction,
  handlePageTransition,
}) => {
  const { multipayment } = transaction

  const hasThisPaymentType = paymentType =>
    multipayment.find(item => equals(item, paymentType))

  const multipaymentButtons = allowedOptions.map((option) => {
    const {
      paymentType,
      title,
      transitionTo,
    } = option

    if (!hasThisPaymentType(paymentType)) {
      return null
    }

    return (
      <Row alignCenter>
        <Col
          tv={mediumColSize}
          desk={mediumColSize}
          tablet={defaultColSize}
          palm={defaultColSize}
        >
          <Button
            className={theme.paymentOption}
            onClick={handlePageTransition(transitionTo)}
            full
          >
            <span className={theme.paymentTitle}>
              {title}
            </span>
          </Button>
        </Col>
      </Row>
    )
  })

  return (
    <Grid className={theme.page}>
      <Row alignCenter>
        <Col
          tv={mediumColSize}
          desk={mediumColSize}
          tablet={defaultColSize}
          palm={defaultColSize}
        >
          <Button
            className={theme.paymentOption}
            onClick={handlePageTransition('SINGLE_CREDITCARD')}
            full
          >
            <span className={theme.paymentTitle}>
              1 cartão de crédito
            </span>
          </Button>
        </Col>
      </Row>
      { multipaymentButtons }
      <Row alignCenter>
        <Col
          tv={mediumColSize}
          desk={mediumColSize}
          tablet={defaultColSize}
          palm={defaultColSize}
        >
          <Button
            className={theme.paymentOption}
            onClick={handlePageTransition('SINGLE_BOLETO')}
            full
          >
            <span className={theme.paymentTitle}>
              Boleto
            </span>
          </Button>
        </Col>
      </Row>
    </Grid>
  )
}

MultipaymentOptions.propTypes = {
  theme: PropTypes.shape(),
  transaction: PropTypes.shape().isRequired,
  handlePageTransition: PropTypes.func.isRequired,
}

MultipaymentOptions.defaultProps = {
  theme: {},
}

export default applyThemr(MultipaymentOptions)
