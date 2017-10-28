import { customIntegration, simpleIntegration } from './api'
import registerServiceWorker from './registerServiceWorker'

const checkoutFormButtons = document.querySelectorAll('.checkout-button')
const hasSimpleIntegration = checkoutFormButtons.length > 0

if (hasSimpleIntegration) {
  simpleIntegration(checkoutFormButtons)
} else {
  window.Checkout = customIntegration
}

registerServiceWorker()
