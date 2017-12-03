import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './styles.css'

class Content extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activePage: 0,
    }
  }

  componentWillReceiveProps (nextProps) {
    let { activePage } = this.state
    const { children, navigateTo } = nextProps

    const firstPage = 0
    const lastPage = children.length - 1

    if (navigateTo === 'next') activePage += 1
    if (navigateTo === 'prev') activePage -= 1
    if (navigateTo === 'first') activePage = firstPage
    if (navigateTo === 'last') activePage = lastPage

    if (activePage >= firstPage && activePage <= lastPage) {
      this.setState({ activePage })
    }
  }

  render () {
    return (
      <div className={style.content}>
        { this.props.children[this.state.activePage] }
      </div>
    )
  }
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
  navigateTo: PropTypes.oneOf([
    'next',
    'prev',
    'first',
    'last',
  ]),
}

Content.defaultProps = {
  navigateTo: null,
}

export default Content
