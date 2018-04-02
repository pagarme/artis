import generateInstallments from './generateInstallments'

describe('Calculate Installments', () => {
  it('Should calculate', () => {
    const installmentsOptions = {
      initial: 2,
      max: 10,
      free: 3,
      interestRate: [
        {
          installment: 4,
          type: 'percentage',
          value: 10,
        },
        {
          installment: 6,
          type: 'amount',
          value: 12000,
        },
      ],
    }

    const firstInstallment = {
      name: '1x de R$ 100,00 sem juros.',
      value: '1',
      amount: 10000,
      installmentAmount: '10000',
    }

    const middleInstallment = {
      name: '5x de R$ 22,00 com juros.',
      value: '5',
      interest: 1000,
      amount: 11000,
      installmentAmount: '2200',
    }

    const lastInstallment = {
      name: '10x de R$ 22,00 com juros.',
      value: '10',
      interest: 12000,
      amount: 22000,
      installmentAmount: '2200',
    }

    const newInstallments = generateInstallments(10000, installmentsOptions)

    expect(newInstallments[0]).toEqual(firstInstallment)
    expect(newInstallments[4]).toEqual(middleInstallment)
    expect(newInstallments[9]).toEqual(lastInstallment)
  })

  it('Should calculate with high amount', () => {
    const installmentsOptions = {
      initial: 2,
      max: 10,
      free: 1,
      interestRate: [
        {
          installment: 2,
          type: 'percentage',
          value: 25,
        },
      ],
    }

    const firstInstallment = {
      name: '1x de R$ 10.000,00 sem juros.',
      value: '1',
      amount: 1000000,
      installmentAmount: '1000000',
    }

    const secondInstallment = {
      name: '2x de R$ 6.250,00 com juros.',
      value: '2',
      amount: 1250000,
      interest: 250000,
      installmentAmount: '625000',
    }

    const newInstallments = generateInstallments(
      1000000,
      installmentsOptions,
    )

    expect(newInstallments[0]).toEqual(firstInstallment)
    expect(newInstallments[1]).toEqual(secondInstallment)
  })
})
