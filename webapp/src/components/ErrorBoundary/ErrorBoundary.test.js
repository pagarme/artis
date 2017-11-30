/* eslint no-console: ["error", { allow: ["error"] }] */
import React from 'react'
import { mount } from 'enzyme'

import ErrorBoundary from './index'

describe('ErrorBoundary', () => {
  const FriendlyError = () => {
    throw new Error('Oh no!')
  }

  const FriendlyMessage = () => (
    <h1>Sorry but this app broke</h1>
  )

  it('should be an error when mount', () => {
    console.error = jest.fn()

    const wrapper = mount(
      <ErrorBoundary CrashReportComponent={<FriendlyMessage />}>
        <FriendlyError />
      </ErrorBoundary>
    )

    expect(wrapper.find('h1').text()).toEqual('Sorry but this app broke')
    expect(console.error).toHaveBeenCalled()
  })
})
