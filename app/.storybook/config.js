import { configure, getStorybook } from '@storybook/react'

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
serializeStories(getStorybook)
