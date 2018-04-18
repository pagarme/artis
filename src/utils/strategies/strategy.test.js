import getStrategyName from './getStrategyName'

describe('Get strategy by public key', () => {
  it('Should return a pagarme', () => {
    const data = {
      token: 'chk_',
      key: 'ek_MvwcV2n4LnYra87kyh5tAH6cjkyGqG',
    }

    const strategyName = getStrategyName(data)

    expect(strategyName).toBe('pagarme')
  })

  it('Should return a mundipagg', () => {
    const data = {
      token: 'chk_',
    }

    const strategyName = getStrategyName(data)

    expect(strategyName).toBe('mundipagg')
  })
})
