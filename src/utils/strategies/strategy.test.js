import getStrategyName from './getStrategyName'

describe('Get strategy by public key', () => {
  it('Should return pagarme', () => {
    const data = {
      key: 'ek_MvwcV2n4LnYra87kyh5tAH6cjkyGqG',
    }

    const strategyName = getStrategyName(data)

    expect(strategyName).toBe('pagarme')
  })

  it('Should return mundipagg', () => {
    const data = {
      token: 'chk_',
    }

    const strategyName = getStrategyName(data)

    expect(strategyName).toBe('mundipagg')
  })
})
