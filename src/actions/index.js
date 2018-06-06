export const addCreditCard = payload => ({
  type: 'ADD_CREDIT_CARD',
  payload,
})

export const addInstallments = payload => ({
  type: 'ADD_INSTALLMENTS',
  payload,
})

export const addPageInfo = payload => ({
  type: 'ADD_PAGE_INFO',
  payload,
})

export const addTransactionValues = payload => ({
  type: 'ADD_TRANSACTIONS_VALUES',
  payload,
})

export const changeScreenSize = size => ({
  type: 'CHANGE_SCREEN_SIZE',
  size,
})

export const updateCardId = payload => ({
  type: 'UPDATE_CARD_ID',
  payload,
})

export const updateFinalAmount = payload => ({
  type: 'UPDATE_FINAL_AMOUNT',
  payload,
})

export const toggleCart = () => ({
  type: 'TOGGLE',
})
