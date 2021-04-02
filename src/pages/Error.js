import React from 'react'
import PropTypes from 'prop-types'

import Grid from '../former-kit/Grid'
import Row from '../former-kit/Row'
import Col from '../former-kit/Col'
import ThemeConsumer from '../former-kit/ThemeConsumer'

import SadEmoji from './../images/sad.svg'

const consumeTheme = ThemeConsumer('UIErrorPage')

const ErrorPage = ({ theme }) => (
  <Grid className={theme.page}>
    <Row
      className={theme.selfAlign}
    >
      <Col
        tv={5}
        desk={5}
        tablet={5}
        palm={5}
      >
        <Row>
          <Col
            tv={3}
            desk={3}
            tablet={3}
            palm={3}
          >
            <SadEmoji className={theme.image} />
          </Col>
          <Col
            tv={9}
            desk={9}
            tablet={9}
            palm={9}
          >
            <p className={theme.title}>Perdão...</p>
            <p className={theme.subtitle}>Tivemos um probleminha</p>
          </Col>
        </Row>
      </Col>
    </Row>
  </Grid>
)

ErrorPage.propTypes = {
  theme: PropTypes.shape({
    container: PropTypes.string,
    friendlyMessage: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
}

export default consumeTheme(ErrorPage)
