import React from 'react'
import { storiesOf } from '@storybook/react'

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
]

storiesOf('Cart', module)
  .add('sample', () => (
    <Cart items={items} amount={15000} />
  ))
