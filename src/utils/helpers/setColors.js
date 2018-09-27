import { prop } from 'ramda'

const setColors = (colors) => {
  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')

  const css = `:root {
    --checkout-primary-color: ${prop('primaryColor', colors)};
    --checkout-secondary-color: ${prop('secondaryColor', colors)};
    --checkout-background-color: ${prop('backgroundColor', colors)};
    --header-footer-color: ${prop('headerFooterColor', colors)};
    --steps-line-color: ${prop('stepsLineColor', colors)};
    --input-focused-color: ${prop('InputFocusColor', colors)};
    --input-color: ${prop('inputColor', colors)};
    --button-disabled-background-color: ${prop(
    'buttonDisabledBackground',
    colors
  )};
    --button-disabled-color: ${prop('buttonDisabledColor', colors)};
    --footer-bold-color: ${prop('footerBoldColor', colors)};
    --addresses-switch-color: ${prop('addressesSwitchColor', colors)};
    --button-outline-box-shadow: ${prop('buttonOutlineBoxShadow', colors)};
    --button-outline-color: ${prop('buttonOutlineColor', colors)};
    --button-outline-hover-color: ${prop('buttonOutlineHoverColor', colors)};
    --action-button-background: ${prop('actionButtonBackground', colors)};
    --action-button-border: ${prop('actionButtonBorderColor', colors)};
    --action-button-hover-border: ${prop(
    'actionButtonHoverBorderColor',
    colors
  )};
    --action-button-title-color: ${prop('actionButtonTitleColor', colors)};
    --action-button-subtitle-color: ${prop(
    'actionButtonSubtitleColor',
    colors
  )};
    --action-button-icon-fill: ${prop('actionButtonIconFill', colors)};
    --text-color: ${prop('textColor', colors)};
    --dropdown-color: ${prop('dropdownColor', colors)};
    --dropdown-background-color: ${prop('dropdownBackground', colors)};
    --dropdown-border-color: ${prop('dropdownBorderColor', colors)};
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
