import React from 'react'
import PropTypes from 'prop-types'
import { equals } from 'ramda'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

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
  base,
  theme,
  transaction,
  handlePageTransition,
}) => {
  const { multipayment } = transaction

  const hasThisPaymentType = paymentType =>
    multipayment.find(item => equals(item, paymentType))

  const multipaymentButtons = allowedOptions.map((option, index) => {
    const {
      paymentType,
      title,
      transitionTo,
    } = option

    if (!hasThisPaymentType(paymentType)) {
      return null
    }

    const key = `${theme.paymentTitle}${index}`

    return (
      <Row alignCenter key={key}>
        <Col
          className={theme.wrapperButton}
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
            <p className={theme.paymentTitle}>
              {title}
            </p>
          </Button>
        </Col>
      </Row>
    )
  })

  const { paymentMethods } = transaction
  const { creditcard, boleto } = paymentMethods

  return (
    <Grid className={classNames(theme.page, theme[base])}>
      <Row alignCenter>
        <Col
          className={theme.wrapperButton}
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
            <p className={theme.paymentTitle}>
              1 cartão de crédito
            </p>
            <p className={theme.paymentSubtitle}>
              {creditcard.subtitle}
            </p>
          </Button>
        </Col>
      </Row>
      { multipaymentButtons }
      <Row alignCenter>
        <Col
          className={theme.wrapperButton}
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
            <p className={theme.paymentTitle}>
              Boleto
            </p>
            <p className={theme.paymentSubtitle}>
              {boleto.subtitle}
            </p>
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
  base: PropTypes.string.isRequired,
}

MultipaymentOptions.defaultProps = {
  theme: {},
}

export default applyThemr(MultipaymentOptions)
