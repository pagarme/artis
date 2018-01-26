import calculateInstallments, {
  filterInstallment,
} from './calculateInstallments'
import installments from './installments'

describe('Calculate Installments', () => {
  it('Should calculate', () => {
    const creditcardOptions = {
      maxInstallments: 6,
      interestRate: 25,
      freeInstallment: 2,
    }

    const newInstallments = calculateInstallments(
      creditcardOptions,
      installments,
      100
    )

    expect(newInstallments).toHaveLength(6)
    expect(newInstallments[3].amount).toBe(125)
  })

  it('Should check installment range ', () => {
    const installment = {
      value: 2,
    }

    const isInRange = filterInstallment(2)(installment)

    expect(isInRange).toBeTruthy()
  })

  it('Should check installment is out of range ', () => {
    const installment = {
      value: 3,
    }

    const isInRange = filterInstallment(2)((installment))

    expect(isInRange).toBeFalsy()
  })
})
