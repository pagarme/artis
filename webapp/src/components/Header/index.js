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

const defaultColSize = 4

const Header = ({
  base,
  logoSrc,
  logoAlt,
  onPrev,
  onClose,
}) => (
  <header className={style.header}>
    <Grid>
      <Row>
        <Col
          tv={defaultColSize}
          desk={defaultColSize}
          tablet={defaultColSize}
          palm={defaultColSize}
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
          tv={defaultColSize}
          desk={defaultColSize}
          tablet={defaultColSize}
          palm={defaultColSize}
          alignCenter
        >
          <img className={style.logo} src={logoSrc} alt={logoAlt} />
        </Col>
        <Col
          tv={defaultColSize}
          desk={defaultColSize}
          tablet={defaultColSize}
          palm={defaultColSize}
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
  logoSrc: string,
  logoAlt: string,
  onPrev: func,
  onClose: func,
}

Header.defaultProps = {
  base: 'dark',
  logoSrc: '',
  logoAlt: '',
  onPrev: null,
  onClose: null,
}

export default Header
