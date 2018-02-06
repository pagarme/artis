const fs = require('fs')

const {
  map,
  pipe,
  pick,
  merge,
  flatten,
} = require('ramda')

const robrowserPath = './config/robrowser'
const testsFolder = `${robrowserPath}/tests`
const url = 'http://localhost:3000/'

module.exports = (deviceType, configs) => {  
  const getTestFiles = folder => fs
    .readdirSync(`${testsFolder}/${folder}`)
    .map(file => file)

  const pickFiles = map(file => ({
    test: `${testsFolder}/${deviceType}/${file}`,
    url,
  }))

  const pickBrowsers = pickFn => device =>
    device.browsers.map(browser =>
      merge(pickFn(device), browser))

  const mergeFilesOnBrowser = files => map(browser =>
    map(file => merge(file, browser), files)
  )

  const files = getTestFiles(deviceType)

  const createTests = pickFn => pipe(
    map(pickBrowsers(pickFn)),
    flatten,
    mergeFilesOnBrowser(pickFiles(files)),
    flatten,
  )

  const pickParams = {
    desktop: pick([
      'os',
      'os_version',
      'local',
      'resolution',
    ]),
    mobile: pick([
      'device',
      'os_version',
      'realMobile',
      'local',
      'resolution',
    ])
  }

  return createTests(pickParams[deviceType])(configs)
}
