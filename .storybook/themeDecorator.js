import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import ThemeProvider from './former-kit/ThemeProvider'

import defaultTheme from '../src/themes/default'
import setColors from '../src/utils/helpers/setColors'

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={{
    name: 'Checkout Theme',
    styles: defaultTheme,
  }}
  >
    {storyFn()}
  </ThemeProvider>
)

addDecorator(ThemeDecorator)
setColors('#37cc9a', '#46b67c')
