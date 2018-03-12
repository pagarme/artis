import React from 'react'
import Proptypes from 'prop-types'
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
}) => (
  <div
    className={classNames(theme.cart, {
      [theme.collapsed]: collapsed,
    })}
  >
    <div className={theme.header}>
      <Button
        hidden={showCloseButton}
        fill="clean"
        relevance="low"
        className={theme.close}
        onClick={onToggleCart}
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
  theme: Proptypes.shape({
    title: Proptypes.string,
    itemList: Proptypes.string,
    item: Proptypes.string,
    total: Proptypes.string,
    amount: Proptypes.string,
    open: Proptypes.string,
    close: Proptypes.string,
    closeIcon: Proptypes.string,
    cart: Proptypes.string,
    collapsed: Proptypes.string,
    header: Proptypes.string,
    content: Proptypes.string,
    footer: Proptypes.string,
  }),
  items: Proptypes.arrayOf(Proptypes.shape({
    description: Proptypes.string,
    quantity: Proptypes.number,
    value: Proptypes.number,
  })).isRequired,
  amount: Proptypes.number.isRequired,
  collapsed: Proptypes.bool.isRequired,
  onToggleCart: Proptypes.func.isRequired,
  showCloseButton: Proptypes.bool.isRequired,
}

Cart.defaultProps = {
  theme: {},
}

export default applyThemr(Cart)
