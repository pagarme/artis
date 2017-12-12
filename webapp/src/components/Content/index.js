import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProgressBar from '../../components/ProgressBar'
import renderDesktop from './renderDesktop'
import renderPalm from './renderPalm'

import style from './styles.css'

const shouldUpdateActivePage = (newPage, firstPage, lastPage) =>
  newPage >= firstPage && newPage <= lastPage

const isDesktop = window.innerWidth > 640

class Content extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activePage: 0,
      steps: 0,
    }
  }

  componentWillMount () {
    const pages = this.getPages()
    const steps = pages.props.children.length - 1

    this.setState({ steps })
  }

  componentWillReceiveProps (nextProps) {
    const { navigateTo } = nextProps
    const { activePage } = this.state

    const firstPage = 0
    const lastPage = this.state.steps

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

  getPages () {
    const { activePage } = this.state

    return !isDesktop
      ? renderPalm(activePage)
      : renderDesktop(activePage)
  }

  render () {
    return (
      <div className={style.content}>
        <ProgressBar
          steps={this.state.steps}
          progress={this.state.activePage}
        />
        { this.getPages() }
      </div>
    )
  }
}

Content.propTypes = {
  navigateTo: PropTypes.oneOf([
    'next',
    'prev',
    'first',
    'last',
  ]).isRequired,
}

export default Content
