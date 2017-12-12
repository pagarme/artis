import React, { Fragment } from 'react'
import classNames from 'classnames'

import CustomerData from '../../pages/CustomerData'
import AddressData from '../../pages/AddressData'
import PaymentData from '../../pages/PaymentData'

import style from './styles.css'

const renderPalm = activePage => (
  <Fragment>
    <CustomerData
      className={
        classNames(
          style.page,
          activePage === 0 ? style.active : ''
        )
      }
    />
    <AddressData
      className={
        classNames(
          style.page,
          activePage === 1 ? style.active : ''
        )
      }
    />
    <PaymentData
      className={
        classNames(
          style.page,
          activePage === 2 ? style.active : ''
        )
      }
    />
  </Fragment>
)

export default renderPalm
