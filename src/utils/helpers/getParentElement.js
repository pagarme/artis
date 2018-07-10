export default function getParentElement (el, selector, stopSelector) {
  let retval = null
  let element = el

  while (element) {
    if (element.matches(selector)) {
      retval = element
      break
    } else if (stopSelector && element.matches(stopSelector)) {
      break
    }

    element = element.parentElement
  }

  return retval
}
