import React from 'react'
import { storiesOf } from '@storybook/react'
import { range } from 'ramda'

import { Grid, Row, Col } from '../../src/components/Grid'
import style from './style.css'

const maxColumns = 12

const divStyles = {
  display: 'flex',
  backgroundColor: '#fff',
  width: '100%',
  minHeight: '100px',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#AAA',
  fontFamily: 'sans-serif',
  overflow: 'hidden',
}

storiesOf('Grid')
  .add('Column sizes', () => (
    <div className={style.background}>
      <Grid>
        {range(0, maxColumns).reverse().map(size => (
          <Row key={size}>
            <Col
              tv={maxColumns - size}
              desk={maxColumns - size}
              tablet={maxColumns - size}
              palm={maxColumns - size}
            >
              <div style={divStyles}>
                {`${maxColumns - size} column${maxColumns - size > 1 ? 's' : ''}`}
              </div>
            </Col>
          </Row>
        ))}
      </Grid>
    </div>
  ))
