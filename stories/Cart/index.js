import React from 'react'
import { storiesOf } from '@storybook/react'

import style from './style.css'

import {
  Cart,
} from '../../src/components'

const items = [
  {
    description: 'Green Orange',
    amount: 5000,
    quantity: 1,
    tangible: true,
  },
  {
    description: 'Red Apple',
    amount: 5000,
    quantity: 1,
    tangible: true,
  },
  {
    description: 'WaterMelon',
    amount: 5000,
    quantity: 1,
    tangible: true,
  },
  {
    description: 'Name very very very very great!',
    amount: 100,
    quantity: 1,
    tangible: true,
  },
]

storiesOf('Cart', module)
  .add('sample', () => (
    <div className={style.container}>
      <Cart items={items} amount={15100} />
    </div>
  ))
