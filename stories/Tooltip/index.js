import React from 'react'
import { storiesOf } from '@storybook/react'

import Tooltip from '../../src/components/Tooltip'
import style from './style.css'

const text = `Cras ultricies ligula sed magna dictum porta. Donec rutrum
congueleo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis
quis ac lectus.`

storiesOf('Tooltip', module)
  .add('Sample', () => (
    <div className={style.wrapper}>
      <p>Hover me!</p>
      <Tooltip text={text} />
    </div>
  ))
