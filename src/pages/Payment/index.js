import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from 'former-kit'

import MultipaymentOptions from './MultipaymentOptions'

const consumeTheme = ThemeConsumer('UIPaymentPage')

const PaymentPage = ({
  base,
  transaction,
  handlePageTransition,
  handlePreviousButton,
}) => (
  <MultipaymentOptions
    base={base}
    transaction={transaction}
    handlePageTransition={handlePageTransition}
    handlePreviousButton={handlePreviousButton}
  />
)

PaymentPage.propTypes = {
  base: PropTypes.string.isRequired,
  handlePageTransition: PropTypes.func.isRequired,
  handlePreviousButton: PropTypes.func.isRequired,
  transaction: PropTypes.shape().isRequired,
}

export default consumeTheme(PaymentPage)
