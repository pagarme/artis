import React, { Fragment } from 'react'
import classNames from 'classnames'

import { Grid, Row, Col } from '../../components/Grid'
import CustomerData from '../../pages/CustomerData'
import AddressData from '../../pages/AddressData'
import PaymentData from '../../pages/PaymentData'

import style from './styles.css'

const renderDesktop = activePage => (
  <Fragment>
    <Grid
      className={
        classNames(
          style.page,
          activePage === 0 ? style.active : ''
        )
      }
    >
      <Row>
        <Col tv={6} desk={6} tablet={6}>
          <CustomerData />
        </Col>
        <Col tv={6} desk={6} tablet={6}>
          <AddressData />
        </Col>
      </Row>
    </Grid>
    <PaymentData
      className={
        classNames(
          style.page,
          activePage === 1 ? style.active : ''
        )
      }
    />
  </Fragment>
)

export default renderDesktop
