import React from 'react'
import { storiesOf } from '@storybook/react'

import Error from '../../src/components/MessageInfo/Error'
import Analysis from '../../src/components/MessageInfo/Analysis'
import SuccessInfo from '../../src/components/MessageInfo/Success'
import style from './style.css'

const creditCard = {
  installmentText: '6x de R$ 36,67 com juros',
}

const boleto = {
  barcode: 12345678901234567890,
  name: 'meuboleto',
  url: 'www.pagar.me',
  expirationAt: '2018-11-30',
}

const amount = 1500

storiesOf('Final Pages', module)
  .add('Error', () => (
    <div
      className={style.bg}
    >
      <Error />
    </div>
  ))
  .add('Analysis', () => (
    <div
      className={style.bg}
    >
      <Analysis />
    </div>
  ))
  .add('Success', () => (
    <div
      className={style.bg}
    >
      <SuccessInfo
        amount={amount}
        creditCard={creditCard}
      />
      <SuccessInfo
        amount={amount}
        boleto={boleto}
      />
    </div>
  ))
