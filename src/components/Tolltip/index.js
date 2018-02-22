import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

import icon from '../../images/info.svg'

const applyThemr = themr('UITolltip')

const Tolltip = ({ text, theme, className }) => (
  <div
    className={classNames(
      theme.wrapper,
      className,
      { [theme.position]: !className }
    )}
  >
    <img src={icon} alt={'Informação'} />
    <div className={theme.content}>
      {text}
    </div>
  </div>
)

Tolltip.propTypes = {
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    content: PropTypes.string,
  }),
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Tolltip.defaultProps = {
  theme: {},
  className: null,
}

export default applyThemr(Tolltip)
