import applyDiscount from './applyDiscount'

describe('Calculations', () => {
  describe('applyDiscount', () => {
    it('should calculate by percentage', () => {
      const amountWithDiscount = applyDiscount('percentage', 10, 76499900)

      expect(amountWithDiscount).toBe(68849910)
    })
  })
})
