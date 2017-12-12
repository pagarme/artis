import Checkout from './custom'

const createWrapper = (id) => {
  const hasWrapper = document.getElementById(id)
  if (hasWrapper) return id

  const wrapper = document.createElement('div')
  wrapper.setAttribute('id', id)
  document.querySelector('body').appendChild(wrapper)

  return id
}

const simpleIntegration = (checkoutFormButtons) => {
  checkoutFormButtons.forEach((button) => {
    const create = Checkout(button.dataset.key)

    const checkout = create({
      target: createWrapper('#checkout-wrapper'),
      image: button.dataset.image,
      locale: button.dataset.locale,
      theme: button.dataset.theme,
    })

    const open = checkout({
      amount: button.dataset.amount,
      paymentMethod: button.dataset.paymentMethod,
    })

    button.addEventListener('click', (e) => {
      e.preventDefault()
      open()
    })
  })
}

export default simpleIntegration
