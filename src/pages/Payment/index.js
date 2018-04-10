import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

import SwitchPayment from './SwitchPayment'
import MultipaymentOptions from './MultipaymentOptions'

const applyThemr = themr('UIPaymentPage')

const PaymentPage = ({
  base,
  transaction,
  handleSubmit,
  handlePageTransition,
}) => {
  const { defaultMethod } = transaction

  return (
    transaction.multipayment
      ? <MultipaymentOptions
        base={base}
        transaction={transaction}
        handlePageTransition={handlePageTransition}
      />
      : <SwitchPayment
        base={base}
        defaultMethod={defaultMethod}
        handleSubmit={handleSubmit}
        transaction={transaction}
      />
  )
}

PaymentPage.propTypes = {
  base: PropTypes.string.isRequired,
  handlePageTransition: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  transaction: PropTypes.shape().isRequired,
}

export default applyThemr(PaymentPage)
