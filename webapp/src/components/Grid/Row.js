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
  overflowVisible,
  fullSize,
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
      [theme.overflowVisible]: overflowVisible,
      [theme.fullSize]: fullSize,
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
  overflowVisible,
  fullSize,
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
        overflowVisible,
        fullSize,
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
    overflowVisible: PropTypes.string,
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
  overflowVisible: PropTypes.bool,
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
  overflowVisible: null,
}

export default applyThemr(Row)
