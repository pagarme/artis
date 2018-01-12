import { TOOGLE_FOOTER_BUTTON } from '../constants/ActionTypes'

const defaultState = {
  button: {
    text: 'Continuar',
    visible: true,
  },
}

const footerReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case TOOGLE_FOOTER_BUTTON:
      return {
        ...state,
        button: {
          ...state.button,
          visible: !state.button.visible,
        },
      }

    default:
      return state
  }
}

export default footerReducer
