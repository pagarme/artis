/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  shape,
  string,
  number,
  object,
} from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

import ProgressBar from '../ProgressBar'
import Header from '../Header'
import FooterContainer from '../../containers/FooterContainer'
import { pages, preRender, render } from '../../pages'

import defaultLogo from '../../images/logo_pagarme.png'

const applyThemr = themr('UICheckout')

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
    const { apiValues, theme } = this.props

    const { params = {}, configs = {} } = apiValues

    const preRendered = preRender(pages)

    const renderedPages = render(preRendered)
    const steps = getSteps(preRendered)

    return (
      <div
        className={classNames(
          theme.checkout,
          {
            [theme.closingEffect]: this.state.closingEffect,
          },
        )}
      >
        <div className={theme.wrapper}>
          <Header
            logoAlt="Pagar.me"
            logoSrc={configs.image || defaultLogo}
            onPrev={this.handleNavigation.bind(this, 'prev', renderedPages)}
            onClose={this.close.bind(this)}
            prevButtonDisabled={activePage === 0}
          />
          <div className={theme.content}>
            <ProgressBar
              steps={steps}
              activePage={activePage}
            />
            { renderedPages[activePage] }
          </div>
          <FooterContainer
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
  theme: shape({
    content: string,
    wrapper: string,
    closingEffect: string,
    checkout: string,
  }),
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
  targetElement: object.isRequired,
}

Checkout.defaultProps = {
  theme: {},
  apiValues: {
    configs: {
      image: '',
      theme: 'dark',
    },
  },
}

export default applyThemr(Checkout)
