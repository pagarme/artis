import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

import icon from '../../images/info.svg'

const applyThemr = themr('UITolltip')

const Tolltip = ({ text, theme }) => (
  <div className={theme.wrapper}>
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
}

Tolltip.defaultProps = {
  theme: {},
}

export default applyThemr(Tolltip)
