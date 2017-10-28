import React from 'react'
import { storiesOf } from '@storybook/react'

import SomeButton from '../../src/components/SomeButton'

storiesOf('SomeButton', module)
  .add('All types', () => (
    <div>
      <SomeButton onClick={() => alert('All right!')}>
        Simple test
      </SomeButton>
    </div>
  ))
