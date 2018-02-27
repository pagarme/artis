import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

const applyThemr = themr('UISidebar')

const Sidebar = ({
  theme,
  collapsed,
  children,
}) => (
  <aside
    className={classNames(theme.sidebar, {
      [theme.collapsed]: collapsed,
    })}
  >
    {children}
  </aside>
)

Sidebar.propTypes = {
  theme: PropTypes.shape({
    sidebar: PropTypes.string,
    collapsed: PropTypes.string,
  }),
  collapsed: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

Sidebar.defaultProps = {
  theme: {},
  collapsed: false,
}

export default applyThemr(Sidebar)
