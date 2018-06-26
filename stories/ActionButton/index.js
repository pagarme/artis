import React from 'react'
import { storiesOf } from '@storybook/react'

import { ActionButton } from '../../src/components'
import style from './style.css'
import BoletoIcon from '../../src/images/boleto.svg'
import CreditCardIcon from '../../src/images/credit-card.svg'
import TwoCreditCards from '../../src/images/two-credit-cards.svg'
import CradiCardMoreBoleto from '../../src/images/credit-card-more-boleto.svg'

const onClick = () => null

storiesOf('ActionButton', module)
  .add('Sample', () => (
    <React.Fragment>
      <div
        className={style.bg}
      >
        <ActionButton
          icon={<CreditCardIcon />}
          onClick={onClick}
          subtitle="Em até 10x sem juros"
          title="Cartão de crédito"
        />
        <ActionButton
          icon={<BoletoIcon />}
          onClick={onClick}
          subtitle="Desconto de 25%"
          title="Boleto"
        />
      </div>
      <div
        className={style.bg}
      >
        <ActionButton
          icon={<CradiCardMoreBoleto />}
          onClick={onClick}
          title="Cartão + Boleto"
        />
        <ActionButton
          icon={<TwoCreditCards />}
          onClick={onClick}
          title="2 cartões"
        />
      </div>
    </React.Fragment>
  ))
