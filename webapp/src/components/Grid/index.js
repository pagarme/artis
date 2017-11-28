import React from 'react'
import {
  bool,
  node,
  number,
  string,
} from 'prop-types'
import classNames from 'classnames'

import style from './style.css'

const colClassNames = ({ className, desk, tv, tablet, palm, alignEnd }) =>
  classNames(
    className,
    style.col,
    style[`col-desk-${desk}`],
    style[`col-tv-${tv}`],
    style[`col-tablet-${tablet}`],
    style[`col-palm-${palm}`],
    {
      [style.alignEnd]: alignEnd,
    }
  )

const rowClassNames = ({ flex, stretch, className }) =>
  classNames(
    className,
    style.row,
    {
      [style.flex]: flex,
      [style.stretch]: stretch,
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

export const Row = ({ children, flex, stretch, className }) => (
  <div className={rowClassNames({ flex, stretch, className })}>
    {children}
  </div>
)

export const Col = ({
  children,
  desk,
  tv,
  tablet,
  palm,
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
  children: node,
  flex: bool,
  stretch: bool,
  className: string,
}

Row.defaultProps = {
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
  className: string,
}

Col.defaultProps = {
  children: null,
  desk: null,
  tv: null,
  tablet: null,
  palm: null,
  alignEnd: false,
  className: null,
}
