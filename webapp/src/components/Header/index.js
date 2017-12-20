import React from 'react'
import {
  string,
  func,
  bool,
} from 'prop-types'
import CloseIcon from 'react-icons/lib/io/android-close'
import BackIcon from 'react-icons/lib/io/android-arrow-back'

import Button from '../Button'
import {
  Grid,
  Row,
  Col,
} from './../Grid'
import style from './style.css'

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
}) => (
  <header className={style.header}>
    <Grid>
      <Row alignCenter>
        <Col
          tv={buttonColSize}
          desk={buttonColSize}
          tablet={buttonColSize}
          palm={buttonPalmColSize}
        >
          <Button
            className={style.back}
            fill="clean"
            onClick={onPrev}
            relevance="low"
            disabled={prevButtonDisabled}
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
          <img className={style.logo} src={logoSrc} alt={logoAlt} />
        </Col>
        <Col
          tv={buttonColSize}
          desk={buttonColSize}
          tablet={buttonColSize}
          palm={buttonPalmColSize}
          alignEnd
        >
          <Button
            className={style.close}
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
  logoSrc: string,
  logoAlt: string,
  onPrev: func,
  onClose: func,
  prevButtonDisabled: bool,
}

Header.defaultProps = {
  logoSrc: '',
  logoAlt: '',
  onPrev: null,
  onClose: null,
  prevButtonDisabled: false,
}

export default Header
