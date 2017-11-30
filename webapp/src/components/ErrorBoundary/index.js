import { Component } from 'react'
import {
  node,
  element,
} from 'prop-types'

import report from '../../config/ErrorReport'

export default class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
    }
  }

  componentDidCatch (error, errorInfo) {
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
