import React from 'react'
import {
  string,
  func,
  oneOf,
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

const Header = ({
  base,
  className,
  logoSrc,
  logoAlt,
  onPrev,
  onClose,
}) => (
  <header className={className}>
    <Grid>
      <Row className={style.row}>
        <Col
          className={style.buttonContainer}
          tv="4"
          desk="4"
          tablet="4"
          palm="4"
          alignStart
        >
          <Button
            className={style.back}
            base={base}
            fill="clean"
            onClick={onPrev}
            relevance="normal"
          >
            <BackIcon />
          </Button>
        </Col>
        <Col
          className={style.logoContainer}
          tv="4"
          desk="4"
          tablet="4"
          palm="4"
          alignCenter
        >
          <img className={style.logo} src={logoSrc} alt={logoAlt} />
        </Col>
        <Col
          className={style.buttonContainer}
          tv="4"
          desk="4"
          tablet="4"
          palm="4"
          alignEnd
        >
          <Button
            base={base}
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
  base: oneOf([
    'dark', 'light',
  ]),
  className: string,
  logoSrc: string,
  logoAlt: string,
  onPrev: func,
  onClose: func,
}

Header.defaultProps = {
  base: 'dark',
  className: '',
  logoSrc: '',
  logoAlt: '',
  onPrev: null,
  onClose: null,
}

export default Header
