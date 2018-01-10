import React from 'react'
import {
  string,
} from 'prop-types'

import { Grid, Row, Col } from '../../components/Grid'

import style from '../style.css'

const colSize = 12

const Payment = ({ title }) => (
  <Grid>
    <Row>
      <Col
        tv={colSize}
        desk={colSize}
        tablet={colSize}
        palm={colSize}
        className={style.title}
        alignCenter
      >
        {title}
      </Col>
    </Row>
  </Grid>
)

Payment.propTypes = {
  title: string.isRequired,
}

export default Payment
