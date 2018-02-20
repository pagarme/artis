import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'

import SadEmoji from './../images/sad.svg'
import { Grid, Row, Col } from './../components/Grid'

const applyThemr = themr('UIErrorPage')

const ErrorPage = ({ theme }) => (
  <Grid className={theme.page}>
    <Row
      fullSize
      alignCenter
      alignVerticalCenter
    >
      <Col
        tv={5}
        desk={5}
        tablet={5}
        palm={5}
      >
        <Row
          fullSize
          alignCenter
          alignVerticalCenter
        >
          <Col
            tv={3}
            desk={3}
            tablet={3}
            palm={3}
          >
            <img src={SadEmoji} alt="Pessoa triste" className={theme.image} />
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

export default applyThemr(ErrorPage)
