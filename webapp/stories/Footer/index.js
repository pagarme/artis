import React from 'react'
import { storiesOf } from '@storybook/react'

import Footer from '../../src/components/Footer'
import style from './style.css'

storiesOf('Footer', module)
  .add('Sample', () => (
    <div className={style.wrapper}>
      <Footer
        total={33000.15}
        buttonText={'Continuar'}
        buttonClick={() => console.info('ok')}
        companyName={'Pagar.me'}
      />
    </div>
  ))
