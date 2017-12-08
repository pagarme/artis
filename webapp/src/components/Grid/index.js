import React from 'react'
import {
  bool,
  node,
  number,
  string,
} from 'prop-types'
import classNames from 'classnames'

import style from './style.css'

const colClassNames = ({
  className,
  desk,
  tv,
  tablet,
  palm,
  alignStart,
  alignCenter,
  alignEnd,
}) =>
  classNames(
    className,
    style.col,
    style[`col-desk-${desk}`],
    style[`col-tv-${tv}`],
    style[`col-tablet-${tablet}`],
    style[`col-palm-${palm}`],
    {
      [style.alignStart]: alignStart,
      [style.alignCenter]: alignCenter,
      [style.alignEnd]: alignEnd,
    }
  )

const rowClassNames = ({ flex, stretch, alignCenter, className }) =>
  classNames(
    className,
    style.row,
    {
      [style.flex]: flex,
      [style.stretch]: stretch,
      [style.alignItensCenter]: alignCenter,
    }
  )

const gridClassNames = ({ className }) =>
  classNames(
    style.grid,
    className
  )

export const Grid = ({ children, className }) => (
  <div className={gridClassNames({ className })}>
    {children}
  </div>
)

export const Row = ({ children, flex, stretch, alignCenter, className }) => (
  <div className={rowClassNames({ flex, stretch, alignCenter, className })}>
    {children}
  </div>
)

export const Col = ({
  children,
  desk,
  tv,
  tablet,
  palm,
  alignStart,
  alignCenter,
  alignEnd,
  className,
}) => (
  <div
    className={
      colClassNames({
        desk,
        tv,
        tablet,
        palm,
        alignStart,
        alignCenter,
        alignEnd,
        className,
      })
    }
  >
    {children}
  </div>
)

Grid.propTypes = {
  children: node,
  className: string,
}

Grid.defaultProps = {
  children: null,
  className: null,
}

Row.propTypes = {
  alignCenter: bool,
  children: node,
  flex: bool,
  stretch: bool,
  className: string,
}

Row.defaultProps = {
  alignCenter: false,
  children: null,
  flex: false,
  stretch: false,
  className: null,
}

Col.propTypes = {
  children: node,
  desk: number,
  tv: number,
  tablet: number,
  palm: number,
  alignEnd: bool,
  alignCenter: bool,
  alignStart: bool,
  className: string,
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
