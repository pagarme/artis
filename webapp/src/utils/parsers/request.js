import strategies from '../strategies'

const request = (data, strategy) => strategy(data)

export {
  request,
  strategies,
}
