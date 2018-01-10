import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const applyThemr = themr('UIGrid')

const classnames = ({
  className,
  desk,
  tv,
  tablet,
  palm,
  alignStart,
  alignCenter,
  alignEnd,
  theme,
}) =>
  classNames(
    className,
    theme.col,
    theme[`col-desk-${desk}`],
    theme[`col-tv-${tv}`],
    theme[`col-tablet-${tablet}`],
    theme[`col-palm-${palm}`],
    {
      [theme.alignStart]: alignStart,
      [theme.alignCenter]: alignCenter,
      [theme.alignEnd]: alignEnd,
    }
  )

const Col = ({
  children,
  desk,
  tv,
  tablet,
  palm,
  alignStart,
  alignCenter,
  alignEnd,
  className,
  theme,
}) => (
  <div
    className={
      classnames({
        desk,
        tv,
        tablet,
        palm,
        alignStart,
        alignCenter,
        alignEnd,
        className,
        theme,
      })
    }
  >
    {children}
  </div>
)

Col.propTypes = {
  theme: PropTypes.shape({
    col: PropTypes.string,
    alignStart: PropTypes.string,
    alignCenter: PropTypes.string,
    alignEnd: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
  desk: PropTypes.number,
  tv: PropTypes.number,
  tablet: PropTypes.number,
  palm: PropTypes.number,
  alignEnd: PropTypes.bool,
  alignCenter: PropTypes.bool,
  alignStart: PropTypes.bool,
  className: PropTypes.string,
}

Col.defaultProps = {
  children: null,
  desk: null,
  tv: null,
  tablet: null,
  palm: null,
  alignEnd: false,
  alignCenter: false,
  alignStart: false,
  className: null,
}

export default applyThemr(Col)
