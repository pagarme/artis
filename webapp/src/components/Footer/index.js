import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LockIcon from 'react-icons/lib/md/lock-outline'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../Grid'
import Button from '../Button'

const applyThemr = themr('UIFooter')

const palmColSize = 12
const buttonColSize = 12
const defaultColSize = 6

const Footer = ({
  buttonText,
  buttonClick,
  companyName,
  nextButtonDisabled,
  theme,
  buttonVisible,
}) => (
  <footer>
    <Grid>
      <Row>
        <Col
          desk={buttonColSize}
          tv={buttonColSize}
          tablet={buttonColSize}
          palm={palmColSize}
          alignEnd
        >
          <Button
            hidden={nextButtonDisabled}
            disabled={nextButtonDisabled}
            size="extra-large"
            relevance="normal"
            onClick={buttonClick}
            className={classNames(theme.button, {
              [theme.hidden]: !buttonVisible,
            })}
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
}

Footer.propTypes = {
  theme: PropTypes.shape({
    button: PropTypes.string,
    powered: PropTypes.string,
    safe: PropTypes.string,
    total: PropTypes.string,
    value: PropTypes.string,
  }),
  buttonText: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  companyName: PropTypes.string.isRequired,
  nextButtonDisabled: PropTypes.bool,
  buttonVisible: PropTypes.bool.isRequired,
}

export default applyThemr(Footer)
