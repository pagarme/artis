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

const Grid = ({ theme, id, children, className, hidden }) => (
  <div id={id} className={classnames({ theme, className, hidden })}>
    {children}
  </div>
)

Grid.propTypes = {
  theme: PropTypes.shape({
    grid: PropTypes.string,
    hidden: PropTypes.string,
  }).isRequired,
  id: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  hidden: PropTypes.bool,
}

Grid.defaultProps = {
  id: null,
  children: null,
  className: null,
  hidden: false,
}

export default applyThemr(Grid)
