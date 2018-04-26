import getInputAmountValue from './getInputAmountValue'
import getInstallments from './getInstallments'
import modifyInstallments from './modifyInstallments'

describe('test helper functions', () => {
  it('should get input amount value', () => {
    const formDataExample = {
      'creditcard-amount': 1000,
    }

    const inputAmountNames = {
      first: 'creditcard-amount',
      second: 'boleto-amount',
    }

    expect(
      getInputAmountValue(formDataExample, inputAmountNames, 'first')
    ).toBe(100000)

    expect(
      getInputAmountValue(formDataExample, inputAmountNames, 'second', 5000)
    ).toBe(5000)
  })

  it('should generate installments', () => {
    const installmentsExample = [
      {
        amount: 10000,
        installmentAmount: '10000',
        interest: 0,
        name: '1x de R$\u00A0100.00 sem juros',
        value: '1',
      },
      {
        amount: 10000,
        installmentAmount: '5000',
        interest: 0,
        name: '2x de R$\u00A050.00 sem juros',
        value: '2',
      },
      {
        amount: 11000,
        installmentAmount: '3667',
        interest: 1000,
        name: '3x de R$\u00A036.67 com juros',
        value: '3',
      },
    ]

    expect(getInstallments(10000, {
      installments: [{
        max: 3,
        free: 2,
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
    }, 0)).toEqual(installmentsExample)
  })

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
      modifyInstallments(creditcardExample1)
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
      modifyInstallments(creditcardExample2)
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
      modifyInstallments({ creditcard: '4242 4242 4242 4242' })
    ).toEqual({ creditcard: '4242 4242 4242 4242' })

    expect(
      modifyInstallments({})
    ).toEqual({})
  })
})
