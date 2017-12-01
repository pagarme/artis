import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from '../../src/components/Button'
import style from './style.css'

storiesOf('Buttons', module)
  .add('All', () => (
    <div className={style.container}>
      <h2>Default</h2>

      <div className={style.spacing}>
        <Button>Call to action</Button>
        <Button relevance="high">Call to action</Button>
        <Button relevance="low">Call to action</Button>
      </div>
    </div>
  ))
