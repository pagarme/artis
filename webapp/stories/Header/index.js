import React from 'react'
import { storiesOf } from '@storybook/react'

import Header from '../../src/components/Header'
import Logo from './logo_pagarme.png'
import style from './style.css'

storiesOf('Header', module)
  .add('Sample', () => (
    <div className={style.wrapper}>
      <Header
        logoSrc={Logo}
      />
    </div>
  ))
