const createTestTo = require('./createTestTo')
const desktop = require('./config/desktop')
const mobile = require('./config/mobile')

module.exports = [
  ...createTestTo('desktop', desktop),
  ...createTestTo('mobile', mobile),
]

