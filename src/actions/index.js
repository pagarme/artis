export const changeScreenSize = size => ({
  type: 'CHANGE_SCREEN_SIZE',
  size,
})

export const addPageInfo = payload => ({
  type: 'ADD_PAGE_INFO',
  payload,
})

export const updateFinalAmount = payload => ({
  type: 'UPDATE_FINAL_AMOUNT',
  payload,
})

export const toggleCart = () => ({
  type: 'TOGGLE',
})
