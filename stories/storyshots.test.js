import initStoryshots from '@storybook/addon-storyshots'
import React from 'react' // eslint-disable-line

initStoryshots()

jest.mock('react-dom', () => ({
  findDOMNode: () => ({
    querySelector: () => null,
  }),
}))

jest.mock('shortid', () => ({
  generate: () => 'shortid-mock',
}))
