import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

import SwitchPayment from './SwitchPayment'
import MultipaymentOptions from './MultipaymentOptions'

const applyThemr = themr('UIPaymentPage')

const PaymentPage = ({
  transaction,
  handleSubmit,
  handlePageTransition,
}) => (
  transaction.multipayment
    ? <MultipaymentOptions
      transaction={transaction}
      handlePageTransition={handlePageTransition}
    />
    : <SwitchPayment
      transaction={transaction}
      handleSubmit={handleSubmit}
    />
)

PaymentPage.propTypes = {
  transaction: PropTypes.shape().isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlePageTransition: PropTypes.func.isRequired,
}

export default applyThemr(PaymentPage)
