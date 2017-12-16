import React, { Component } from 'react'
import {
  arrayOf,
  shape,
  node,
  string,
} from 'prop-types'

import ProgressBar from '../ProgressBar'
import { preRender, render } from '../../pages'

import style from './styles.css'

const isDesktop = window.innerWidth > 640

const shouldUpdateActivePage = (newPage, firstPage, lastPage) =>
  newPage >= firstPage && newPage <= lastPage

const getSteps = (pagesToJoin, normalPages) => {
  if (!isDesktop) return []

  return [
    pagesToJoin[0].props.stepTitle,
    ...normalPages.map(page => page.props.stepTitle),
  ]
}

class Content extends Component {
  constructor (props) {
    super(props)

    this.state = {
      pages: [],
      steps: [],
      activePage: 0,
    }
  }

  componentWillMount () {
    const { pages } = this.props
    const { pagesToJoin, normalPages } = preRender(pages)

    const renderedPages = render(pagesToJoin, normalPages)
    const steps = getSteps(pagesToJoin, normalPages)

    this.setState({
      pages: renderedPages,
      steps,
    })
  }

  componentWillReceiveProps (nextProps) {
    const { navigateTo } = nextProps
    const { pages, activePage } = this.state

    const firstPage = 0
    const lastPage = pages.length - 1

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
    const { steps, pages, activePage } = this.state

    return (
      <div className={style.content}>
        <ProgressBar
          steps={steps}
          activePage={activePage}
        />
        { pages[activePage] }
      </div>
    )
  }
}

Content.propTypes = {
  pages: arrayOf(shape({
    join: string.required,
    component: node.required,
  })).isRequired,
  navigateTo: string.isRequired,
}

export default Content
