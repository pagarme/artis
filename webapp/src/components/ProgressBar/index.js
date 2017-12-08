import React from 'react'
import PropTypes from 'prop-types'

import style from './styles.css'

const ProgressBar = ({ steps, progress }) => {
  const width = `${(100 / steps) * progress}%`

  return (
    <div className={style.wrapper}>
      <div className={style.progressBar} style={{ width }} />
    </div>
  )
}

ProgressBar.propTypes = {
  steps: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
}

export default ProgressBar
