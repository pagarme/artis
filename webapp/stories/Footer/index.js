import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Footer from '../../src/components/Footer'
import style from './style.css'

storiesOf('Footer', module)
  .add('Sample', () => (
    <div className={style.wrapper}>
      <Footer
        total={33000.15}
        buttonText={'Continuar'}
        buttonClick={action('Click')}
        companyName={'Pagar.me'}
      />
    </div>
  ))
