import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './styles.css'

class ProgressBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      progress: 0,
    }
  }

  componentWillReceiveProps (nextProps) {
    const { progress, steps } = nextProps

    if (progress <= steps) {
      this.setState({ progress })
    }
  }

  getStyle () {
    const { progress } = this.state
    const { steps } = this.props
    const width = `${(100 / steps) * progress}%`

    return { width }
  }

  render () {
    return (
      <div className={style.wrapper}>
        <div className={style.progressBar} style={this.getStyle()} />
      </div>
    )
  }
}

ProgressBar.propTypes = {
  steps: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
}

export default ProgressBar
