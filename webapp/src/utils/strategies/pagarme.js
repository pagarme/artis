const strategy = (data) => new Promise(resolve => { // eslint-disable-line
  setTimeout(() => resolve({ data }), 3000)
})

export default strategy
