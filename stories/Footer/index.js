import React from 'react'
import { storiesOf } from '@storybook/react'

import Footer from '../../src/components/Footer'
import style from './style.css'

storiesOf('Footer', module)
  .add('Sample', () => (
    <div className={style.wrapper}>
      <Footer
        total={33000.15}
        companyName={'Pagar.me'}
        cartButtonVisible={false}
      />
    </div>
  ))
