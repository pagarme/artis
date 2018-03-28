import React from 'react'
import { ThemeProvider } from 'react-css-themr'
import { storiesOf, addDecorator } from '@storybook/react'

import defaultTheme from '../src/themes/default'
import setColors from '../src/utils/helpers/setColors'

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={defaultTheme}>
    {storyFn()}
  </ThemeProvider>
)

addDecorator(ThemeDecorator)
setColors('#7ad499', '#46b67c')
