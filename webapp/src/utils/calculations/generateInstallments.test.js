import generateInstallments from './generateInstallments'

describe('Calculate Installments', () => {
  it('Should calculate', () => {
    const creditcardOptions = {
      maxInstallments: 6,
      interestRate: 25,
      freeInstallments: 1,
    }

    const installment2 = {
      name: '2x de R$ 62,50 com juros.',
      value: 2,
      amount: 12500,
      interest: 2500,
      installmentAmount: '6250',
    }

    const installment1 = {
      name: '1x de R$ 100,00 sem juros.',
      value: 1,
      amount: 10000,
      installmentAmount: '10000',
    }

    const newInstallments = generateInstallments(
      creditcardOptions,
      10000
    )

    expect(newInstallments[1]).toEqual(installment2)
    expect(newInstallments[0]).toEqual(installment1)
  })

  it('Should calculate with high amount', () => {
    const creditcardOptions = {
      maxInstallments: 6,
      interestRate: 25,
      freeInstallments: 1,
    }

    const installment2 = {
      name: '2x de R$ 6.250,00 com juros.',
      value: 2,
      amount: 1250000,
      interest: 250000,
      installmentAmount: '625000',
    }

    const installment1 = {
      name: '1x de R$ 10.000,00 sem juros.',
      value: 1,
      amount: 1000000,
      installmentAmount: '1000000',
    }

    const newInstallments = generateInstallments(
      creditcardOptions,
      1000000
    )

    expect(newInstallments[1]).toEqual(installment2)
    expect(newInstallments[0]).toEqual(installment1)
  })
})
