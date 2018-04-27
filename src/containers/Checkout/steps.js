import React from 'react'

import UserIcon from '../../images/user.svg'
import MapIcon from '../../images/map.svg'
import PaymentIcon from '../../images/payment.svg'
import ConfirmationIcon from '../../images/confirmation.svg'

export default [
  {
    page: 'customer',
    title: 'Identificação',
    icon: <UserIcon />,
    visible: true,
  },
  {
    page: 'billing',
    title: 'Endereço',
    icon: <MapIcon />,
    visible: true,
  },
  {
    page: 'shipping',
    title: 'Endereço',
    icon: <MapIcon />,
    visible: true,
  },
  {
    page: 'payment',
    title: 'Forma de Pagamento',
    icon: <PaymentIcon />,
    visible: true,
  },
  {
    page: 'singleCreditCard',
    visible: false,
  },
  {
    page: 'singleBoleto',
    visible: false,
  },
  {
    page: 'creditCardAndBoleto',
    visible: false,
  },
  {
    page: 'transaction',
    visible: false,
  },
  {
    page: 'confirmation',
    title: 'Confirmação',
    icon: <ConfirmationIcon />,
    visible: true,
  },
]
