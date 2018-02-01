import React from 'react'
import { storiesOf } from '@storybook/react'
import InputExamples from './examples/Input'
import SelectExamples from './examples/Select'

import style from './style.css'

storiesOf('Forms', module)
  .add('Inputs', () => (
    <div className={style.container}>
      <InputExamples />
    </div>
  ))
  .add('Select', () => (
    <div className={style.container}>
      <SelectExamples />
    </div>
  ))
