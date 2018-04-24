import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'
import {
  filter,
  isEmpty,
  isNil,
  identity,
  join,
  pipe,
} from 'ramda'
import { connect } from 'react-redux'

import CloseIcon from 'emblematic-icons/svg/ClearClose32.svg'
import CustomerIcon from 'emblematic-icons/svg/User24.svg'
import MailIcon from 'emblematic-icons/svg/Mail24.svg'
import CartIcon from 'emblematic-icons/svg/ShoppingCart24.svg'

import { Button } from 'former-kit'

import { formatToBRL } from '../../utils/masks/'

const applyThemr = themr('UICart')

const parseDataLine = (separator, data) => pipe(
  filter(identity),
  join(separator)
)(data)

class Cart extends React.Component {
  renderClientData () {
    const {
      shipping,
      customer,
      theme,
    } = this.props

    const firstLineData = [
      shipping.street,
      shipping.number,
      shipping.complement,
    ]

    const secondLineData = [
      shipping.neighborhood,
      shipping.city,
    ]

    return (
      <div className={theme.clientData}>
        <p>Resumo da Compra</p>
        {
          customer.name && <p>
            <CustomerIcon />
            {customer.name}
          </p>
        }
        {
          customer.email && <p>
            <MailIcon />
            {customer.email}
          </p>
        }
        {
          !isEmpty(shipping) && <p>
            <CartIcon />
            <span>
              {parseDataLine(', ', firstLineData)}
              <br />
              {parseDataLine(' - ', secondLineData)}
              <br />
              {(shipping.zipcode && `CEP: ${shipping.zipcode}`)}
            </span>
          </p>
        }
      </div>
    )
  }

  render () {
    const {
      amount,
      shippingRate,
      theme,
      base,
      collapsed,
      customer,
      items,
      onToggleCart,
      shipping,
      showCloseButton,
    } = this.props

    const shouldRenderClientData = !isEmpty(customer) || !isEmpty(shipping)

    return (
      <div
        className={classNames(
          theme.cart,
          theme[base],
          {
            [theme.collapsed]: collapsed,
          }
        )}
      >
        <div className={theme.header}>
          <Button
            hidden={showCloseButton}
            fill="clean"
            relevance="low"
            className={theme.close}
            onClick={onToggleCart}
            base={base}
            icon={<CloseIcon size={20} />}
          />
        </div>
        <div className={theme.content}>
          <h2 className={theme.title}>Carrinho de compra</h2>
          <ul className={theme.itemList}>
            {
              items.map(item => (
                <li
                  key={item.title}
                  className={theme.item}
                >
                  <h4>{item.title}</h4>
                  <p>{formatToBRL(item.unitPrice)}</p>
                </li>
              ))
            }
            {
              !isNil(shippingRate) &&
              <li
                className={theme.item}
              >
                <h4>Frete</h4>
                <p>
                  {
                    shippingRate ?
                      formatToBRL(shippingRate) :
                      'Grátis'
                  }
                </p>
              </li>
            }
          </ul>
          <p className={theme.total}>Total</p>
          <p className={theme.amount}>{formatToBRL(amount)}</p>
        </div>
        <div className={theme.footer}>
          { shouldRenderClientData && this.renderClientData() }
        </div>
      </div>
    )
  }
}

Cart.propTypes = {
  theme: PropTypes.shape({
    title: PropTypes.string,
    itemList: PropTypes.string,
    item: PropTypes.string,
    total: PropTypes.string,
    amount: PropTypes.string,
    open: PropTypes.string,
    close: PropTypes.string,
    closeIcon: PropTypes.string,
    cart: PropTypes.string,
    collapsed: PropTypes.string,
    clientData: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string,
    footer: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    quantity: PropTypes.number,
    value: PropTypes.number,
  })),
  base: PropTypes.string,
  collapsed: PropTypes.bool.isRequired,
  onToggleCart: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  customer: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  shippingRate: PropTypes.number,
  shipping: PropTypes.shape({
    street: PropTypes.string,
    number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    neighborhood: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
  }),
  amount: PropTypes.number.isRequired,
}

Cart.defaultProps = {
  base: 'dark',
  customer: {},
  shippingRate: null,
  items: [],
  shipping: {},
  theme: {},
}

const mapStateToProps = ({ transactionValues }) => ({
  amount: transactionValues.amount,
})

export default connect(mapStateToProps, {})(applyThemr(Cart))
