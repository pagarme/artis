export const changeScreenSize = size => ({
  type: 'CHANGE_SCREEN_SIZE',
  size,
})

export const addPageInfo = payload => ({
  type: 'ADD_PAGE_INFO',
  payload,
})

export const decrementRealAmount = payload => ({
  type: 'DECREMENT_REAL_AMOUNT',
  payload,
})

export const incrementRealAmount = payload => ({
  type: 'INCREMENT_REAL_AMOUNT',
  payload,
})
