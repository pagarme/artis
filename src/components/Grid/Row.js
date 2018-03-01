import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const applyThemr = themr('UIGrid')

const classnames = ({
  theme,
  flex,
  stretch,
  alignCenter,
  alignVerticalCenter,
  className,
  hidden,
  alignEnd,
  fullSize,
  noPadding,
}) =>
  classNames(
    className,
    theme.row,
    {
      [theme.flex]: flex,
      [theme.stretch]: stretch,
      [theme.alignCenter]: alignCenter,
      [theme.alignVerticalCenter]: alignVerticalCenter,
      [theme.alignEnd]: alignEnd,
      [theme.hidden]: hidden,
      [theme.fullSize]: fullSize,
      [theme.noPadding]: noPadding,
    }
  )

const Row = ({
  theme,
  children,
  flex,
  stretch,
  alignCenter,
  alignVerticalCenter,
  className,
  hidden,
  alignEnd,
  fullSize,
  noPadding,
}) => (
  <div
    className={
      classnames({
        theme,
        flex,
        stretch,
        alignCenter,
        alignVerticalCenter,
        className,
        hidden,
        alignEnd,
        fullSize,
        noPadding,
      })
    }
  >
    {children}
  </div>
)

Row.propTypes = {
  theme: PropTypes.shape({
    row: PropTypes.string,
    flex: PropTypes.string,
    stretch: PropTypes.string,
    alignVerticalCenter: PropTypes.string,
    hidden: PropTypes.string,
    fullSize: PropTypes.string,
  }).isRequired,
  alignEnd: PropTypes.bool,
  alignCenter: PropTypes.bool,
  alignVerticalCenter: PropTypes.bool,
  children: PropTypes.node,
  flex: PropTypes.bool,
  stretch: PropTypes.bool,
  hidden: PropTypes.bool,
  fullSize: PropTypes.bool,
  className: PropTypes.string,
  noPadding: PropTypes.bool,
}

Row.defaultProps = {
  alignEnd: false,
  alignCenter: false,
  alignVerticalCenter: false,
  children: null,
  flex: false,
  stretch: false,
  hidden: false,
  fullSize: false,
  className: null,
  noPadding: null,
}

export default applyThemr(Row)
