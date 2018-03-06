import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import CloseIcon from 'react-icons/lib/io/android-close'
import BackIcon from 'react-icons/lib/io/android-arrow-back'

import Button from '../Button'
import { Grid, Row, Col } from './../Grid'

const applyThemr = themr('UIHeader')

const buttonColSize = 1
const imgColSize = 10

const buttonPalmColSize = 3
const imgPalmColSize = 6

const Header = ({
  logoSrc,
  logoAlt,
  onPrev,
  onClose,
  prevButtonDisabled,
  theme,
  base,
}) => (
  <header className={theme.header}>
    <Grid>
      <Row alignCenter>
        <Col
          tv={buttonColSize}
          desk={buttonColSize}
          tablet={buttonColSize}
          palm={buttonPalmColSize}
        >
          <Button
            base={base}
            className={theme.back}
            fill="clean"
            onClick={onPrev}
            relevance="low"
            disabled={prevButtonDisabled}
            hidden={prevButtonDisabled}
          >
            <BackIcon />
          </Button>
        </Col>
        <Col
          tv={imgColSize}
          desk={imgColSize}
          tablet={imgColSize}
          palm={imgPalmColSize}
          alignCenter
        >
          {
            logoSrc && <img
              className={theme.logo}
              src={logoSrc}
              alt={logoAlt}
            />
          }
        </Col>
        <Col
          tv={buttonColSize}
          desk={buttonColSize}
          tablet={buttonColSize}
          palm={buttonPalmColSize}
          alignEnd
        >
          <Button
            base={base}
            className={theme.close}
            fill="clean"
            onClick={onClose}
            relevance="high"
          >
            <CloseIcon />
          </Button>
        </Col>
      </Row>
    </Grid>
  </header>
)

Header.propTypes = {
  theme: PropTypes.shape({
    close: PropTypes.string,
    logo: PropTypes.string,
    back: PropTypes.string,
    header: PropTypes.string,
  }),
  base: PropTypes.string,
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  onPrev: PropTypes.func,
  onClose: PropTypes.func,
  prevButtonDisabled: PropTypes.bool,
}

Header.defaultProps = {
  theme: {},
  base: 'dark',
  logoSrc: '',
  logoAlt: '',
  onPrev: null,
  onClose: null,
  prevButtonDisabled: false,
}

export default applyThemr(Header)
