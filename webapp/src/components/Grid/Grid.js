import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const applyThemr = themr('UIGrid')

const classnames = ({ theme, className }) =>
  classNames(
    theme.grid,
    className
  )

const Grid = ({ theme, children, className }) => (
  <div className={classnames({ theme, className })}>
    {children}
  </div>
)

Grid.propTypes = {
  theme: PropTypes.shape({
    grid: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
}

Grid.defaultProps = {
  children: null,
  className: null,
}

export default applyThemr(Grid)
