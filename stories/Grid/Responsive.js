import React from 'react'
import { storiesOf } from '@storybook/react'
import { range } from 'ramda'

import { Grid, Row, Col } from '../../src/components/Grid'
import CardSample from './CardSample'

import style from './style.css'

storiesOf('Grid', module)
  .add('Responsive', () => (
    <div className={style.background}>
      <Grid>
        <Row stretch>
          {range(0, 4).map(i => (
            <Col key={i} desk={3} tv={3} tablet={6} palm={12}>
              <CardSample bgColor="#cc0000" />
            </Col>
          ))}
        </Row>
        <Row stretch>
          <Col desk={12} tv={12} tablet={12} palm={12}>
            <CardSample bgColor="#00cc00" />
          </Col>
        </Row>
        <Row stretch>
          <Col desk={6} tv={6} tablet={6} palm={12}>
            <CardSample bgColor="#0000cc" />
          </Col>
          <Col desk={6} tv={6} tablet={6} palm={12}>
            <CardSample bgColor="#0000cc" />
          </Col>
        </Row>

        <Row stretch>
          <Col desk={6} tv={6} tablet={6} palm={12}>
            <CardSample bgColor="#cccc00" />
          </Col>

          <Col desk={6} tv={6} tablet={6} palm={12}>
            <Row stretch>
              {range(0, 4).map(i => (
                <Col key={i} desk={6} tv={6} tablet={12} palm={12}>
                  <CardSample bgColor="#cc00cc" />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  ))
