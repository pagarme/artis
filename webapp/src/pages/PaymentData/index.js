import React from 'react'
import {
  string,
} from 'prop-types'
import classNames from 'classnames'

const PaymentData = ({ className, active }) =>
  (<div className={classNames(className, active)}>PaymentData</div>)

PaymentData.propTypes = {
  className: string,
  active: string,
}

PaymentData.defaultProps = {
  className: '',
  active: '',
}

export default PaymentData
