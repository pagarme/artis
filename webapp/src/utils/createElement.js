export default (element, id, appendTo) => {
  const el = document.createElement(element)

  el.setAttribute('id', id)
  document.querySelector(appendTo).appendChild(el)

  return el
}
