export default (element, id, appendTo) => {
  const existingElement = document.getElementById(id)

  if (existingElement) {
    return existingElement
  }

  const el = document.createElement(element)

  el.setAttribute('id', id)
  document.querySelector(appendTo).appendChild(el)

  return el
}
