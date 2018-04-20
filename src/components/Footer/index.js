import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

import ShieldIcon from '../../images/escudo.svg'

const applyThemr = themr('UIFooter')

const Footer = ({
  theme,
}) => (
  <footer className={theme.wrapper}>
    <div className={theme.safe}>
      <ShieldIcon />
      <div>
        Ambiente <span className={theme.safeText}>Seguro</span>
      </div>
    </div>
    <div className={theme.powered}>
      Tecnologia <span className={theme.companyName}>Pagar.me</span>
    </div>
  </footer>
)

Footer.propTypes = {
  theme: PropTypes.shape({
    companyName: PropTypes.string,
    powered: PropTypes.string,
    safe: PropTypes.string,
    safeText: PropTypes.string,
    wrapper: PropTypes.string,
  }),
}

Footer.defaultProps = {
  theme: {},
}

export default applyThemr(Footer)
