import cep from 'cep-promise'

const getAddress = zipcode =>
  cep(zipcode)
    .catch(() => ({
      message: 'CEP não encontrado. Preencha seu endereço abaixo.',
    }))

export default getAddress
