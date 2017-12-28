import React from 'react'

import Customer from './Customer'
import Billing from './Billing'
import Shipping from './Shipping'
import Payment from './Payment'

import preRender from './helpers/preRender'
import render from './helpers/render'

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
    component: <Shipping
      title="Selecione um endereço cadastrado"
      stepTitle="Endereço de Entrega"
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
