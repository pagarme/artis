export const changeScreenSize = size => ({
  type: 'CHANGE_SCREEN_SIZE',
  size,
})

export const addPageInfo = payload => ({
  type: 'ADD_PAGE_INFO',
  payload,
})

export const decrementFinalAmount = payload => ({
  type: 'DECREMENT_FINAL_AMOUNT',
  payload,
})

export const incrementFinalAmount = payload => ({
  type: 'INCREMENT_FINAL_AMOUNT',
  payload,
})

export const resetFinalAmount = () => ({
  type: 'RESET_FINAL_AMOUNT',
})

export const toggleCart = () => ({
  type: 'TOGGLE',
})
