import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

const applyThemr = themr('UISidebar')

const SidebarFooter = ({ theme, children }) => (
  <div className={theme.footer}>
    {children}
  </div>
)

SidebarFooter.propTypes = {
  theme: PropTypes.shape({
    content: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

SidebarFooter.defaultProps = {
  theme: {},
}

export default applyThemr(SidebarFooter)
