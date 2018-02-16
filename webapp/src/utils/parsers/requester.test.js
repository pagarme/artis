import {
  request,
} from './request'

describe('Requester', () => {
  it('should called function strategy', () => {
    const strategy = jest.fn()
    const data = {}

    request(data, strategy)

    expect(strategy).toHaveBeenCalledWith(data)
  })
})
