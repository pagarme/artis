import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  shape,
  string,
  number,
  element,
} from 'prop-types'
import classNames from 'classnames'

import ProgressBar from '../ProgressBar'
import Header from '../Header'
import Footer from '../Footer'
import { pages, preRender, render } from '../../pages'

import defaultLogo from '../../images/logo_pagarme.png'
import style from './style.css'

const isDesktop = window.innerWidth > 640

const getSteps = ({ pagesToJoin, normalPages }) => {
  if (!isDesktop) return []

  return [
    pagesToJoin[0].props.stepTitle,
    ...normalPages.map(page => page.props.stepTitle),
  ]
}

const shouldUpdateActivePage = (newPage, firstPage, lastPage) =>
  newPage >= firstPage && newPage <= lastPage

class Checkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      closingEffect: false,
      activePage: 0,
    }
  }

  handleNavigation (navigateTo, finalPages) {
    const { activePage: currentActivePage } = this.state

    const firstPage = 0
    const lastPage = finalPages.length - 1

    const pageNavigation = {
      next: currentActivePage + 1,
      prev: currentActivePage - 1,
      first: firstPage,
      last: lastPage,
    }

    const activePage = pageNavigation[navigateTo]

    if (shouldUpdateActivePage(activePage, firstPage, lastPage)) {
      this.setState({ activePage })
    }
  }

  close () {
    const { targetElement } = this.props

    this.setState({ closingEffect: true })

    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(
        targetElement
      )
    }, 500)
  }

  render () {
    const { activePage } = this.state
    const { params, configs } = this.props.apiValues

    const preRendered = preRender(pages)

    const renderedPages = render(preRendered)
    const steps = getSteps(preRendered)

    return (
      <div
        className={classNames(
          style.checkout,
          {
            [style.closingEffect]: this.state.closingEffect,
          },
        )}
      >
        <div className={style.wrapper}>
          <Header
            logoAlt="Pagar.me"
            logoSrc={configs.image || defaultLogo}
            onPrev={this.handleNavigation.bind(this, 'prev', renderedPages)}
            onClose={this.close.bind(this)}
            prevButtonDisabled={activePage === 0}
          />
          <div className={style.content}>
            <ProgressBar
              steps={steps}
              activePage={activePage}
            />
            { renderedPages[activePage] }
          </div>
          <Footer
            total={params.amount}
            buttonText={'Continuar'}
            buttonClick={this.handleNavigation.bind(this, 'next', renderedPages)}
            companyName={'Pagar.me'}
            nextButtonDisabled={activePage === renderedPages.length - 1}
          />
        </div>
      </div>
    )
  }
}

Checkout.propTypes = {
  apiValues: shape({
    key: string.isRequired,
    configs: shape({
      image: string,
      theme: string,
      target: string.isRequired,
    }).isRequired,
    params: shape({
      amount: number.isRequired,
      paymentMethod: string.isRequired,
    }),
  }).isRequired,
  targetElement: element.isRequired,
}

Checkout.defaultProps = {
  apiValues: {
    configs: {
      image: '',
      theme: 'dark',
    },
  },
}

export default Checkout
