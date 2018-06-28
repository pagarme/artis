import changeInstallmentsToArray from './changeInstallmentsToArray'

describe('test helper functions', () => {
  it('should modify installments prop if is object', () => {
    const creditcardExample1 = {
      invoiceDescriptor: 'Mercurio :)',
      installments: {
        initial: 2,
        max: 10,
        free: 3,
        interestRate: [
          {
            installment: 3,
            type: 'percentage',
            value: 10,
          },
          {
            installment: 6,
            type: 'amount',
            value: 12000,
          },
        ],
      },
    }

    const creditcardExample2 = {
      invoiceDescriptor: 'Mercurio :)',
      installments: [
        {
          initial: 2,
          max: 10,
          free: 3,
          interestRate: [
            {
              installment: 3,
              type: 'percentage',
              value: 10,
            },
            {
              installment: 6,
              type: 'amount',
              value: 12000,
            },
          ],
        },
        {
          initial: 10,
          max: 99,
          free: 55,
          interestRate: [
            {
              installment: 6,
              type: 'amount',
              value: 42,
            },
          ],
        },
      ],
    }

    expect(
      changeInstallmentsToArray(creditcardExample1)
    ).toEqual({
      invoiceDescriptor: 'Mercurio :)',
      installments: [{
        initial: 2,
        max: 10,
        free: 3,
        interestRate: [
          {
            installment: 3,
            type: 'percentage',
            value: 10,
          },
          {
            installment: 6,
            type: 'amount',
            value: 12000,
          },
        ],
      }],
    })

    expect(
      changeInstallmentsToArray(creditcardExample2)
    ).toEqual({
      invoiceDescriptor: 'Mercurio :)',
      installments: [
        {
          initial: 2,
          max: 10,
          free: 3,
          interestRate: [
            {
              installment: 3,
              type: 'percentage',
              value: 10,
            },
            {
              installment: 6,
              type: 'amount',
              value: 12000,
            },
          ],
        },
        {
          initial: 10,
          max: 99,
          free: 55,
          interestRate: [
            {
              installment: 6,
              type: 'amount',
              value: 42,
            },
          ],
        },
      ],
    })

    expect(
      changeInstallmentsToArray({ creditcard: '4242 4242 4242 4242' })
    ).toEqual({ creditcard: '4242 4242 4242 4242' })

    expect(
      changeInstallmentsToArray({})
    ).toEqual({})
  })
})
