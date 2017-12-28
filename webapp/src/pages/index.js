import React from 'react'

import Customer from './Customer'
import Billing from './Billing'
import Payment from './Payment'

import preRender from './preRender'
import render from './render'

const pages = [
  {
    joinRule: 'onDesktop',
    component: <Customer
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
    component: <Payment
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
