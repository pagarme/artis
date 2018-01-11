import React from 'react'
import { ThemeProvider } from 'react-css-themr'
import { storiesOf, addDecorator } from '@storybook/react'

import theme from '../src/theme-pagarme'

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>
    {storyFn()}
  </ThemeProvider>
)

addDecorator(ThemeDecorator)
