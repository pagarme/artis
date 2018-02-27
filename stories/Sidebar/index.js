import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import style from './style.css'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '../../src/components/Sidebar'
import {
  Button,
} from '../../src/components'

class SidebarState extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: false,
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

    return (
      <Fragment>
        <Button className={style.button} onClick={this.handleToggleSidebar}>
          { collapsed ? 'Open' : 'Close' }
        </Button>
        <Sidebar collapsed={collapsed}>
          <SidebarHeader>
            <p className={style.text}>Header</p>
          </SidebarHeader>
          <SidebarContent>
            <p className={style.text}>Content</p>
          </SidebarContent>
          <SidebarFooter>
            <p className={style.text}>Footer</p>
          </SidebarFooter>
        </Sidebar>
      </Fragment>
    )
  }
}


storiesOf('Sidebar', module)
  .add('sample', () => (
    <SidebarState />
  ))
