import React from 'react'
import { storiesOf } from '@storybook/react'

import Tolltip from '../../src/components/Tolltip'
import style from './style.css'

const text = `Cras ultricies ligula sed magna dictum porta. Donec rutrum
congueleo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis
quis ac lectus.`

storiesOf('Tolltip', module)
  .add('Sample', () => (
    <div className={style.wrapper}>
      <p>Hover me!</p>
      <Tolltip text={text} />
    </div>
  ))
