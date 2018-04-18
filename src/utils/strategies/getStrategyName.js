const getStrategy = ({ key }) => {
  if (key) {
    return 'pagarme'
  }

  return 'mundipagg'
}

export default getStrategy
