import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './styles.css'

const shouldUpdateActivePage = (newPage, firstPage, lastPage) =>
  newPage >= firstPage && newPage <= lastPage

class Content extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activePage: 0,
    }
  }

  componentWillReceiveProps (nextProps) {
    const { activePage } = this.state
    const { children, navigateTo } = nextProps

    const firstPage = 0
    const lastPage = children.length - 1

    const pageNavigation = {
      next: activePage + 1,
      prev: activePage - 1,
      first: firstPage,
      last: lastPage,
    }

    const newPage = pageNavigation[navigateTo]

    if (shouldUpdateActivePage(newPage, firstPage, lastPage)) {
      this.setState({ activePage: newPage })
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
