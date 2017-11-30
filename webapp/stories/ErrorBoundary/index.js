import React from 'react'
import { storiesOf } from '@storybook/react'

import ErrorBoundary from '../../src/components/ErrorBoundary'
import BuggyCounter from './BuggyCounter'
import FriendlyMessage from './FriendlyMessage'

storiesOf('ErrorBoundary', module)
  .add('Catch Exception', () => (
    <ErrorBoundary CrashReportComponent={<FriendlyMessage />}>
      <BuggyCounter />
    </ErrorBoundary>
  ))
