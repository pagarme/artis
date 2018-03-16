import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'
import CloseIcon from 'emblematic-icons/svg/ClearClose32.svg'

import { Button } from '..'

import formatBRL from '../../utils/helpers/formatToBRL'

const applyThemr = themr('UICart')

const Cart = ({
  theme,
  collapsed,
  items,
  amount,
  onToggleCart,
  showCloseButton,
  base,
}) => (
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
      >
        <CloseIcon />
      </Button>
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
              <p>{formatBRL(item.unitPrice)}</p>
            </li>
          ))
        }
      </ul>
    </div>
    <div className={theme.footer}>
      <p className={theme.total}>Total</p>
      <p className={theme.amount}>{formatBRL(amount)}</p>
    </div>
  </div>
)

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
    header: PropTypes.string,
    content: PropTypes.string,
    footer: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
    quantity: PropTypes.number,
    value: PropTypes.number,
  })).isRequired,
  base: PropTypes.string,
  amount: PropTypes.number.isRequired,
  collapsed: PropTypes.bool.isRequired,
  onToggleCart: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
}

Cart.defaultProps = {
  theme: {},
  base: 'dark',
}

export default applyThemr(Cart)
