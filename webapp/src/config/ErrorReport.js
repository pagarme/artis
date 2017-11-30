import Raven from 'raven-js'

Raven
  .config(process.env.SENTRY_URL)
  .install()


const report = (error, info) =>
  Raven.captureException(error, { extra: info })

export default report
