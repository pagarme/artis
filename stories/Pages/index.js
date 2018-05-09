import React from 'react'
import { storiesOf } from '@storybook/react'

import Error from '../../src/components/MessageInfo/Error'
import Analysis from '../../src/components/MessageInfo/Analysis'
import SuccessInfo from '../../src/components/MessageInfo/Success'
import Boleto from '../../src/pages/Payment/Boleto'
import createStore from '../../src/store'
import style from './style.css'

const creditCard = {
  installmentText: '6x de R$ 36,67 com juros',
}

const url = 'https://www.pagar.me'

const boleto = {
  barcode: 12345678901234567890,
  name: 'meuboleto',
  url,
  expirationAt: '2018-11-30',
}

const amount = 15000

const transaction = {
  amount,
  paymentConfig: {
    boleto: {
      subtitle: '10% de desconto',
      discount: {
        type: 'percentage',
        value: 50,
      },
    },
  },
}

const store = createStore({
  transaction: {
    amount,
  },
})

storiesOf('Pages', module)
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
  .add('Success creditcard', () => (
    <div
      className={style.bg}
    >
      <SuccessInfo
        amount={amount}
        creditCard={creditCard}
        orderUrl={url}
      />
    </div>
  ))
  .add('Success boleto', () => (
    <div
      className={style.bg}
    >
      <SuccessInfo
        amount={amount}
        boleto={boleto}
      />
    </div>
  ))
  .add('Boleto', () => (
    <div
      className={style.wrapper}
    >
      <Boleto
        handlePreviousButton={() =>{}} //eslint-disable-line
        handlePageChange={() =>{}} //eslint-disable-line
        handleSubmit={() =>{}} //eslint-disable-line
        store={store}
        transaction={transaction}
      />
    </div>
  ))
