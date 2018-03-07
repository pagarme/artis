const strategy = data => new Promise((resolve) => {
  setTimeout(() => resolve({ data }), 3000)
})

export default strategy
