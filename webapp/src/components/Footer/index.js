import React from 'react'
import {
  string,
  func,
  bool,
} from 'prop-types'
import LockIcon from 'react-icons/lib/md/lock-outline'

import { Grid, Row, Col } from '../Grid'
import Button from '../Button'
import style from './style.css'

const palmColSize = 12
const buttonColSize = 12
const defaultColSize = 6

const Footer = ({ buttonText, buttonClick, companyName, nextButtonDisabled }) => (
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
            className={style.button}
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
          className={style.safe}
        >
          <LockIcon />
          Ambiente Seguro
        </Col>
        <Col
          desk={defaultColSize}
          tv={defaultColSize}
          tablet={defaultColSize}
          palm={palmColSize}
          className={style.powered}
        >
          Powered by { companyName }
        </Col>
      </Row>
    </Grid>
  </footer>
)

Footer.propTypes = {
  buttonText: string.isRequired,
  buttonClick: func.isRequired,
  companyName: string.isRequired,
  nextButtonDisabled: bool,
}

Footer.defaultProps = {
  nextButtonDisabled: false,
}

export default Footer
