import React, { Component } from 'react'
import { string } from 'prop-types'

import { Grid, Row, Col } from '../../components/Grid'
import RadioGroup from '../../components/RadioGroup'

import style from '../styles.css'

const defaultColSize = 12
const mediumColSize = 12

class Shipping extends Component {
  constructor (props) {
    super(props)

    this.state = {
      oi: 123,
    }
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col
            tv={defaultColSize}
            desk={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
            className={style.title}
            alignLeft
          >
            {this.props.title}
          </Col>
          <Col
            tv={mediumColSize}
            desk={mediumColSize}
            tablet={mediumColSize}
            palm={mediumColSize}
          >
            <RadioGroup />
          </Col>
          <Col
            tv={mediumColSize}
            desk={mediumColSize}
            tablet={mediumColSize}
            palm={mediumColSize}
          >
            blz
          </Col>
        </Row>
      </Grid>
    )
  }
}

Shipping.propTypes = {
  title: string.isRequired,
}

export default Shipping
