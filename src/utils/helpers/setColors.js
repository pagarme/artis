const setColors = (primaryColor, secondaryColor, backgroundColor) => {
  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')

  const css = `:root {
    --checkout-primary-color: ${primaryColor};
    --checkout-secondary-color: ${secondaryColor};
    --checkout-background-color: ${backgroundColor};
  }`

  style.type = 'text/css'

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  head.appendChild(style)
}

export default setColors
