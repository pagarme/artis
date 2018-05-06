import React from 'react'
import { storiesOf } from '@storybook/react'
import Error from '../../src/components/MessageInfo/Error'
import style from './style.css'

storiesOf('Final Pages', module)
  .add('Error', () => (
    <div
      className={style.bg}
    >
      <Error />
    </div>
  ))
