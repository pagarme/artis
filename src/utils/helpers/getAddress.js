import cep from 'cep-promise/dist/cep-promise.min'

const getAddress = zipcode =>
  cep(zipcode)
    .catch(() => ({
      message: 'CEP não encontrado. Preencha seu endereço abaixo.',
    }))

export default getAddress
