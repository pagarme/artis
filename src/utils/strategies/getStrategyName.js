const getStrategyName = ({ key, token }) => {
  let response

  if (key) response = 'pagarme'
  if (token) response = 'mundipagg'

  return response || 'pagarme'
}

export default getStrategyName
