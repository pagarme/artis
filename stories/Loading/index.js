import React from 'react'

import { storiesOf } from '@storybook/react'

import LoadingInfo from '../../src/components/LoadingInfo'


import style from './style.css'

storiesOf('LoadingInfo', module)
  .add('defaultTheme', () => (
    <div className={style.container}>
      <LoadingInfo />
    </div>
  ))
