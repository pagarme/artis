import {
  formatInstallments,
  formatToBRL,
  removeMask,
  removeMaskPlaceholder,
} from './index'

describe('Test replacements for mask replacement functions', () => {
  it('should remove all mask characters', () => {
    expect(removeMask('')).toBe('')
    expect(removeMask('10/12')).toBe('1012')
    expect(removeMask('_/_')).toBe('')
    expect(removeMask('4321 ____ ____ ____')).toBe('4321')
    expect(removeMask('01.218-542')).toBe('01218542')
  })

  it('should remove only placeholder characters', () => {
    expect(removeMaskPlaceholder('_')).toBe(' ')
    expect(removeMaskPlaceholder('04991-__')).toBe('04991-  ')
    expect(
      removeMaskPlaceholder('4321 ____ ____ ____')).toBe('4321'.padEnd(19, ' ')
    )
  })

  it('should format currency in BRL', () => {
    expect(formatToBRL(5000)).toEqual('R$50.00')
    expect(formatToBRL(0)).toEqual('R$0.00')
  })

  it('should return formatted installments as expected', () => {
    const installmentsExample = [
      {
        amount: 10000,
        installmentAmount: '10000',
        interest: 0,
        value: '1',
      },
      {
        amount: 10000,
        installmentAmount: '5000',
        interest: 0,
        value: '2',
      },
      {
        amount: 10000,
        installmentAmount: '3333',
        interest: 100,
        value: '3',
      },
    ]

    expect(formatInstallments([])).toEqual([])
    expect(formatInstallments(installmentsExample)).toEqual([
      {
        amount: 10000,
        installmentAmount: '10000',
        interest: 0,
        name: '1x de R$100.00 sem juros',
        value: '1',
      },
      {
        amount: 10000,
        installmentAmount: '5000',
        interest: 0,
        name: '2x de R$50.00 sem juros',
        value: '2',
      },
      {
        amount: 10000,
        installmentAmount: '3333',
        name: '3x de R$33.33 com juros',
        interest: 100,
        value: '3',
      },
    ])
  })
})
