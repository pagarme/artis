const overwriteLocalStorage = (data) => {
  const state = JSON.stringify(data)

  localStorage.setItem('state', state)
}

const overwriteLappendLocalStorageocalStorage = (data) => {
  const state = JSON.stringify(data)

  localStorage.setItem('state', state)
}

const getLocalStorage = () => {
  const state = localStorage.getItem('checkout')

  if (state === null) { return undefined }

  return JSON.parse(state)
}


/*
overwriteLocalStorage - passa por cima de tudo
appendLocalStorage - adiciona um item novo
getLocalStorage - pega tudo
removeLocalStorage - mata tudo

overwriteLocalStorageItem - reescreve um item
appendLocalStorageItem - adiciona um valor no item já existente
getLocalStorageItem - pega um item específico
removeLocalStorageItem - mata um item específico
*/

export default {
  overwriteLocalStorage,
  getLocalStorage,
}
