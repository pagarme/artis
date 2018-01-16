import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../../components/Grid'

const applyThemr = themr('UIPaymentPage')

const colSize = 12

const Payment = ({ title, theme }) => (
  <Grid className={theme.page}>
    <Row>
      <Col
        tv={colSize}
        desk={colSize}
        tablet={colSize}
        palm={colSize}
        className={theme.title}
        alignCenter
      >
        {title}
      </Col>
    </Row>
  </Grid>
)

Payment.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
}

Payment.defaultProps = {
  theme: {},
}

export default applyThemr(Payment)
