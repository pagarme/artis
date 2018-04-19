import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import { find, type } from 'ramda'

import SwitchPayment from './SwitchPayment'
import MultipaymentOptions from './MultipaymentOptions'

const applyThemr = themr('UIPaymentPage')

const hasMultipayment = find(item => type(item) === 'Array')

const PaymentPage = ({
  base,
  transaction,
  handleSubmit,
  handlePageTransition,
}) => {
  const { defaultMethod, paymentMethods } = transaction

  return (
    hasMultipayment(paymentMethods)
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
