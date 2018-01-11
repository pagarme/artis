import { configure } from '@storybook/react'

import './themeDecorator'

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
