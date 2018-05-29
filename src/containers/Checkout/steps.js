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
  },
  {
    page: 'addresses',
    title: 'Endereços',
    icon: <MapIcon />,
  },
  {
    page: 'payment',
    title: 'Forma de Pagamento',
    icon: <PaymentIcon />,
  },
  {
    page: 'confirmation',
    title: 'Confirmação',
    icon: <ConfirmationIcon />,
  },
]
