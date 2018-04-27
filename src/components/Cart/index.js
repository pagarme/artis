import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'
import {
  always,
  add,
  anyPass,
  equals,
  insert,
  isNil,
  ifElse,
  join,
  pipe,
  prop,
  reduce,
} from 'ramda'

import {
  ThemeConsumer,
} from 'former-kit'

import CartIcon from '../../images/cart.svg'
import CloseIcon from '../../images/clear-close.svg'
import { formatToBRL } from '../../utils/masks/'

const consumeTheme = ThemeConsumer('UICart')

const formatShippingRate = ifElse(
  equals(0),
  always('Gratis!'),
  formatToBRL
)

const formatZipcode = pipe(
  insert(5, '-'),
  join('')
)

const hasShippingLines = anyPass([
  prop('street'),
  prop('number'),
  prop('additionalInfo'),
  prop('zipcode'),
  prop('city'),
  prop('state'),
])

const generateShippingLine = ({
  street = '',
  number = '',
  additionalInfo = '',
  city = '',
  state = '',
  zipcode = '',
}) => `
${street} ${number} - ${additionalInfo}\n
CEP ${formatZipcode(zipcode)} - ${city} - ${state}
`

const sumItem = (total, { unitPrice, quantity }) => (
  total + (
    quantity && quantity > 1 ?
      quantity * unitPrice :
      unitPrice
  )
)

const sumAmount = (items, shippingRate) => pipe(
  reduce(sumItem, 0),
  add(shippingRate)
)(items)

class Cart extends React.Component {
  state = {
    collapsed: true,
  }

  handleToggle = () => {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }))
  }

  renderItens = ({
    id,
    title,
    unitPrice,
    quantity,
  }) => {
    const amount = sumItem(0, { unitPrice, quantity })
    const { theme } = this.props

    return (
      <div
        key={id || title}
        className={theme.item}
      >
        <p>
          <span>{quantity}x</span> {title}
        </p>
        <p>
          {formatToBRL(amount)}
        </p>
      </div>
    )
  }

  renderScrollbarThumb = () => {
    const { theme } = this.props

    return <div className={theme.scrollbarThumb} />
  }

  render () {
    const {
      base,
      customer,
      shippingRate,
      shipping,
      theme,
      items,
    } = this.props

    const amount = sumAmount(items, shippingRate)

    const renderFreight = !isNil(shippingRate)
    const cartClasses = classNames(
      theme.cart,
      theme[base],
      {
        [theme.collapsed]: this.state.collapsed,
      }
    )

    const customerName = prop('name', customer)
    const customerEmail = prop('email', customer)
    const shippingLine = hasShippingLines(shipping)
      ? generateShippingLine(shipping)
      : ''

    return (
      <React.Fragment>
        <button
          className={theme.openCart}
          onClick={this.handleToggle}
        >
          <CartIcon />
        </button>
        <section className={cartClasses}>
          <h1 className={theme.title}>
            <CartIcon />
            <span>Sua compra</span>
            <CloseIcon
              onClick={this.handleToggle}
              className={theme.closeIcon}
            />
          </h1>
          <div className={theme.itemsWrapper}>
            <Scrollbars
              renderThumbVertical={this.renderScrollbarThumb}
            >
              {items.map(this.renderItens)}
            </Scrollbars>
          </div>
          <div className={theme.customerResume}>
            {
              customerName &&
              <div>
                <p>Nome</p>
                <p>{customerName}</p>
              </div>
            }
            {
              customerEmail &&
              <div>
                <p>E-mail</p>
                <p>{customerEmail}</p>
              </div>
            }
            {
              shippingLine &&
              <div>
                <p>Entrega</p>
                <p>{shippingLine}</p>
              </div>
            }
          </div>
          <div className={theme.amountResume}>
            <div className={theme.labels}>
              <p>Valor</p>
              {
                renderFreight
                && <p>Frete</p>
              }
              <p>Total</p>
            </div>
            <div className={theme.values}>
              <p>{formatToBRL(amount)}</p>
              {
                renderFreight &&
                <p>{formatShippingRate(shippingRate)}</p>
              }
              <p>{formatToBRL(amount)}</p>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}


Cart.propTypes = {
  theme: PropTypes.shape(),
  base: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  shippingRate: PropTypes.number,
  customer: PropTypes.shape(),
  shipping: PropTypes.shape(),
}

Cart.defaultProps = {
  theme: {},
  base: 'dark',
  customer: {},
  shipping: {},
  items: [],
  shippingRate: null,
}

export default consumeTheme(Cart)
