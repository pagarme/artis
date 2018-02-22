const defaultState = true

const showProgressBar = (state = defaultState, action) => {
  const { payload, type } = action

  switch (type) {
    case 'SHOW_PROGRESSBAR':
      return payload

    default:
      return state
  }
}

export default showProgressBar
