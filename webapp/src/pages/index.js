import React from 'react'

import CustomerData from './CustomerData'
import Billing from './Billing'
import PaymentData from './PaymentData'

import preRender from './preRender'
import render from './render'

const pages = [
  {
    joinRule: 'onDesktop',
    component: <CustomerData
      title="Dados Pessoais"
      stepTitle="Identificação"
    />,
  },
  {
    joinRule: 'onDesktop',
    component: <Billing
      title="Endereço de Cobrança"
    />,
  },
  {
    component: <PaymentData
      title="Dados de Pagamento"
      stepTitle="Forma de Pagamento"
    />,
  },
]

export {
  pages,
  preRender,
  render,
}
