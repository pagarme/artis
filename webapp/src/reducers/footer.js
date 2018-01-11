import { FOOTER_BUTTON } from '../constants/ActionTypes'

const defaultState = {
  button: {
    text: 'Continuar',
    visible: true,
  },
}

const footerReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case FOOTER_BUTTON:
      return Object.assign({}, {
        button: {
          ...action.payload,
        },
      })

    default:
      return state
  }
}

export default footerReducer
