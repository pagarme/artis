import { Component } from 'react'
import Raven from 'raven-js'
import {
  node,
  element,
} from 'prop-types'

export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
    }

    Raven
      .config(process.env.SENTRY_URL)
      .install()
  }

  componentDidCatch (error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo })
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
