import React from 'react'
import { ThemeProvider } from 'react-css-themr'
import { storiesOf, addDecorator } from '@storybook/react'

import defaultTheme from '../src/styles/themes/default'

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={defaultTheme}>
    {storyFn()}
  </ThemeProvider>
)

addDecorator(ThemeDecorator)
