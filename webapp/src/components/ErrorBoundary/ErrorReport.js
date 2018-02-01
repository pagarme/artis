import Raven from 'raven-js'

if (process.env.NODE_ENV === 'production') {
  Raven
    .config(process.env.SENTRY_URL, {
      environment: 'production',
      release: '0.0.1',
    })
    .install()
}

const report = (error, info) =>
  Raven.captureException(error, { extra: info })

export default report
