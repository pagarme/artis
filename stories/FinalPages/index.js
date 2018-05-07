import React from 'react'
import { storiesOf } from '@storybook/react'
import Error from '../../src/components/MessageInfo/Error'
import Analysis from '../../src/components/MessageInfo/Analysis'
import style from './style.css'

storiesOf('Final Pages', module)
  .add('Error', () => (
    <div
      className={style.bg}
    >
      <Error />
    </div>
  ))
  .add('Analysis', () => (
    <div
      className={style.bg}
    >
      <Analysis />
    </div>
  ))
