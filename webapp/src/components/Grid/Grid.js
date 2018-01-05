import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const applyThemr = themr('UIGrid')

const classnames = ({ theme, className, hidden }) =>
  classNames(
    {
      [theme.hidden]: hidden,
    },
    theme.grid,
    className
  )

const Grid = ({ theme, children, className, hidden }) => (
  <div className={classnames({ theme, className, hidden })}>
    {children}
  </div>
)

Grid.propTypes = {
  theme: PropTypes.shape({
    grid: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  hidden: PropTypes.bool,
}

Grid.defaultProps = {
  children: null,
  className: null,
  hidden: false,
}

export default applyThemr(Grid)
