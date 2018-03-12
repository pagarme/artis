import React from 'react'
import PropTypes from 'prop-types'
import LockIcon from 'react-icons/lib/md/lock-outline'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../Grid'

const applyThemr = themr('UIFooter')

const palmColSize = 12
const defaultColSize = 6

const Footer = ({
  companyName,
  theme,
  base,
  buttonVisible,
}) => (
  <footer>
    <Grid className={theme[base]}>
      <Row>
        <Col
          desk={buttonColSize}
          tv={buttonColSize}
          tablet={buttonColSize}
          palm={palmColSize}
          alignEnd
        >
          <Button
            id="footer-confirm-btn"
            hidden={nextButtonDisabled || !buttonVisible}
            disabled={nextButtonDisabled}
            size="extra-large"
            relevance="normal"
            onClick={buttonClick}
            className={theme.button}
            base={base}
          >
            {buttonText}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col
          desk={defaultColSize}
          tv={defaultColSize}
          tablet={defaultColSize}
          palm={palmColSize}
          className={theme.safe}
        >
          <LockIcon />
          Ambiente Seguro
        </Col>
        <Col
          desk={defaultColSize}
          tv={defaultColSize}
          tablet={defaultColSize}
          palm={palmColSize}
          className={theme.powered}
        >
          Powered by { companyName }
        </Col>
      </Row>
    </Grid>
  </footer>
)

Footer.defaultProps = {
  theme: {},
  nextButtonDisabled: false,
  buttonVisible: true,
  base: 'dark',
}

Footer.propTypes = {
  theme: PropTypes.shape({
    button: PropTypes.string,
    powered: PropTypes.string,
    safe: PropTypes.string,
    total: PropTypes.string,
    value: PropTypes.string,
    light: PropTypes.string,
    dark: PropTypes.string,
  }),
  base: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  companyName: PropTypes.string.isRequired,
}

export default applyThemr(Footer)
