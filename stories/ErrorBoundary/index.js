import React from 'react'
import { storiesOf } from '@storybook/react'

import ErrorBoundary from '../../src/components/ErrorBoundary'
import BuggyCounter from './BuggyCounter'
import ErrorPage from './../../src/pages/Error'

storiesOf('ErrorBoundary', module)
  .add('Catch Exception', () => (
    <ErrorBoundary CrashReportComponent={<ErrorPage />}>
      <BuggyCounter />
    </ErrorBoundary>
  ))
