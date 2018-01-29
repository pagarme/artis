import { Component } from 'react'
import {
  node,
  element,
} from 'prop-types'
import ReactGA from 'react-ga'

import report from './ErrorReport'

export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
    }
  }

  componentDidCatch (error, errorInfo) {
    ReactGA.event({
      category: 'Error Boundary',
      action: error.message,
    })

    report(error, errorInfo)

    this.setState({
      error,
    })
  }

  render () {
    const { children, CrashReportComponent } = this.props
    const { error } = this.state

    return (
      error ?
        CrashReportComponent :
        children
    )
  }
}

ErrorBoundary.propTypes = {
  children: node,
  CrashReportComponent: element,
}

ErrorBoundary.defaultProps = {
  children: null,
  CrashReportComponent: null,
}
