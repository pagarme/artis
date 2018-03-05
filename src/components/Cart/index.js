import React, { Fragment } from 'react'
import Proptypes from 'prop-types'
import { themr } from 'react-css-themr'
import CartIcon from 'emblematic-icons/svg/ShoppingCart32.svg'
import CloseIcon from 'emblematic-icons/svg/ClearClose32.svg'

import formatBRL from '../../utils/helpers/formatToBRL'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Button,
} from '..'

const applyThemr = themr('UICart')

class Cart extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: true,
    }

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
  }

  handleToggleSidebar () {
    this.setState(({ collapsed }) => ({ collapsed: !collapsed }))
  }

  render () {
    const {
      collapsed,
    } = this.state

    const {
      theme,
      items,
      amount,
    } = this.props

    return (
      <Fragment>
        <Button
          fill="clean"
          relevance="low"
          className={theme.open}
          onClick={this.handleToggleSidebar}
        >
          <CartIcon />
        </Button>
        <Sidebar collapsed={collapsed}>
          <SidebarHeader>
            <Button
              fill="clean"
              relevance="low"
              className={theme.close}
              onClick={this.handleToggleSidebar}
            >
              <CloseIcon />
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <h2 className={theme.title}>Carrinho de compra</h2>
            <ul className={theme.itemList}>
              {
                items.map(item => (
                  <li
                    key={item.description}
                    className={theme.item}
                  >
                    <h4>{item.description}</h4>
                    <p>{formatBRL(item.amount)}</p>
                  </li>
                ))
              }
            </ul>
          </SidebarContent>
          <SidebarFooter>
            <p className={theme.total}>Total</p>
            <p className={theme.amount}>{formatBRL(amount)}</p>
          </SidebarFooter>
        </Sidebar>
      </Fragment>
    )
  }
}

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
  }),
  items: Proptypes.arrayOf(Proptypes.shape({
    description: Proptypes.string,
    quantity: Proptypes.number,
    value: Proptypes.number,
  })).isRequired,
  amount: Proptypes.number.isRequired,
}

Cart.defaultProps = {
  theme: {},
}

export default applyThemr(Cart)
