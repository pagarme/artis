const remote = require('./config/robrowser/auth')
const browsers = require('./config/robrowser')

module.exports = {
  remote,
  browsers,
  screenshot: {
    folder: './screenshots',
  },
  concurrency: 2,
}

