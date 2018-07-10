import cnpj from './cnpj'

describe('CNPJ', () => {
  it('should validate', () => {
    expect(cnpj('09.296.295/0001-60')).toBeTruthy()
    expect(cnpj('17.192.451/0001-70')).toBeTruthy()
    expect(cnpj('04.944.958/0001-91')).toBeTruthy()
  })

  it('should not validate', () => {
    expect(cnpj('11.111.111/1111-11')).toBeFalsy()
    expect(cnpj('22.065.831/0001-29')).toBeFalsy()
    expect(cnpj('33.512.187/0001-14')).toBeFalsy()
  })
})
