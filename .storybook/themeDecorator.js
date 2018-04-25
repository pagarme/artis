import React from 'react'
import { ThemeProvider as ThemrProvider } from 'react-css-themr'
import { storiesOf, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'former-kit'

import defaultTheme from '../src/themes/default'
import setColors from '../src/utils/helpers/setColors'

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={{
    name: 'Checkout Theme',
    styles: defaultTheme,
  }}
  >
    <ThemrProvider theme={defaultTheme}>
      {storyFn()}
    </ThemrProvider>
  </ThemeProvider>
)

addDecorator(ThemeDecorator)
setColors('#37cc9a', '#46b67c')
