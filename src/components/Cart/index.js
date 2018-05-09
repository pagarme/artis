import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import {
  always,
  anyPass,
  equals,
  insert,
  isNil,
  ifElse,
  join,
  pipe,
  prop,
  propOr,
} from 'ramda'
import {
  ThemeConsumer,
} from 'former-kit'

import { toggleCart } from '../../actions'
import { formatToBRL } from '../../utils/masks/'

import CartIcon from '../../images/cart.svg'
import CloseIcon from '../../images/clear-close.svg'

const consumeTheme = ThemeConsumer('UICart')

const formatShippingFee = ifElse(
  equals(0),
  always('Gratis!'),
  formatToBRL
)

const formatZipcode = pipe(
  insert(5, '-'),
  join('')
)

const hasShippingAddress = anyPass([
  prop('street'),
  prop('number'),
  prop('additionalInfo'),
  prop('zipcode'),
  prop('city'),
  prop('state'),
])

const renderShippingAddress = ({
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
    quantity && quantity > 1
      ? quantity * unitPrice
      : unitPrice
  )
)

class Cart extends React.Component {
  renderItems = ({
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
      amount,
      base,
      customer,
      shipping,
      theme,
      items,
      handleToggleCart,
    } = this.props

    const shippingFee = propOr(0, 'fee')(shipping)

    const shouldRenderShippingFee = !isNil(shipping.fee)

    const cartClasses = classNames(
      theme.cart,
      theme[base],
      {
        [theme.collapsed]: this.props.collapsed,
      }
    )

    const customerName = prop('name', customer)
    const customerEmail = prop('email', customer)
    const initialAmount = prop('initial', amount)
    const finalAmount = prop('final', amount)
    const subtotal = initialAmount - shippingFee

    const shippingAddress = hasShippingAddress(shipping)
      ? renderShippingAddress(shipping)
      : ''

    return (
      <React.Fragment>
        <section className={cartClasses}>
          <h1 className={theme.title}>
            <CartIcon />
            <span>Sua compra</span>
            <CloseIcon
              onClick={handleToggleCart}
              className={theme.closeIcon}
            />
          </h1>
          <div className={theme.itemsWrapper}>
            <Scrollbars
              renderThumbVertical={this.renderScrollbarThumb}
            >
              {items.map(this.renderItems)}
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
              shippingAddress &&
              <div>
                <p>Entrega</p>
                <p>{shippingAddress}</p>
              </div>
            }
          </div>
          <div className={theme.amountResume}>
            <div className={theme.labels}>
              <p>Valor</p>
              {
                shouldRenderShippingFee
                && <p>Frete</p>
              }
              <p>Total</p>
            </div>
            <div className={theme.values}>
              <p>{formatToBRL(subtotal)}</p>
              {
                shouldRenderShippingFee &&
                <p>{formatShippingFee(shippingFee)}</p>
              }
              <p>{formatToBRL(finalAmount)}</p>
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }
}

Cart.propTypes = {
  base: PropTypes.string,
  collapsed: PropTypes.bool,
  customer: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  handleToggleCart: PropTypes.func,
  theme: PropTypes.shape(),
  items: PropTypes.arrayOf(PropTypes.object),
  shipping: PropTypes.shape({
    street: PropTypes.string,
    number: PropTypes.string,
    additionalInfo: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
    fee: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  amount: PropTypes.shape({
    initial: PropTypes.number,
    final: PropTypes.number,
  }).isRequired,
}

Cart.defaultProps = {
  base: 'dark',
  collapsed: true,
  customer: {
    name: '',
    email: '',
  },
  handleToggleCart: null,
  items: [],
  shipping: {
    street: '',
    number: '',
    additionalInfo: '',
    city: '',
    state: '',
    zipcode: '',
    fee: null,
  },
  theme: {},
}

const mapStateToProps = ({ cart }) => ({
  collapsed: cart.collapsed,
})

export default connect(mapStateToProps, {
  handleToggleCart: toggleCart,
})(consumeTheme(Cart))
