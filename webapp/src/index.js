import { customIntegration, simpleIntegration } from './utils/api'

const checkoutFormButtons = document.querySelectorAll('.checkout-button')
const hasSimpleIntegration = checkoutFormButtons.length > 0

if (hasSimpleIntegration) {
  simpleIntegration(checkoutFormButtons)
} else {
  window.Checkout = customIntegration
}
