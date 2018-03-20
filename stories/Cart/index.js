import React from 'react'
import { storiesOf } from '@storybook/react'

import style from './style.css'

import {
  Cart,
  Button,
} from '../../src/components'

const items = [
  {
    id: 1,
    title: 'Red pill',
    unitPrice: 5000,
    quantity: 1,
    tangible: true,
  },
  {
    id: 1,
    title: 'Blue pill',
    unitPrice: 5000,
    quantity: 1,
    tangible: true,
  },
]

class CartState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: false,
    }

    this.handleToggleCart = this.handleToggleCart.bind(this)
  }

  handleToggleCart () {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }))
  }

  render () {
    return (
      <div className={style.container}>
        <Button className={style.button} onClick={this.handleToggleCart}>
          Open
        </Button>
        <Cart
          items={items}
          amount={15100}
          collapsed={this.state.collapsed}
          onToggleCart={this.handleToggleCart}
        />
      </div>
    )
  }
}

storiesOf('Cart', module)
  .add('sample', () => (
    <CartState />
  ))
