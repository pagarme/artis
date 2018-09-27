import Colr from 'colr' //eslint-disable-line
import { path } from 'ramda'
import DEFAULT_COLORS from '../data/colors'

const getColors = (
  clientThemeBase,
  themeBase,
  primaryColor,
  secondaryColor,
  backgroundColor,
  headerFooterColor,
) => {
  const getDefaultColor = (colorPath, element) => (
    element || path(colorPath, DEFAULT_COLORS[clientThemeBase])
  )

  const colors = {
    primaryColor: getDefaultColor(['primary'], primaryColor),
    backgroundColor: getDefaultColor(['backgroundColor'], backgroundColor),
    headerFooterColor: getDefaultColor(['headerFooterColor'], headerFooterColor), //eslint-disable-line
    stepsLineColor: getDefaultColor(['stepsLineColor']),
    buttonDisabledBackground: getDefaultColor(['button', 'disabled', 'background']), //eslint-disable-line
    buttonDisabledColor: getDefaultColor(['button', 'disabled', 'color']),
    buttonOutlineColor: getDefaultColor(['button', 'outline', 'color']),
    buttonOutlineBoxShadow: getDefaultColor(['button', 'outline', 'boxShadow']),
    buttonOutlineHoverColor: getDefaultColor(['button', 'outline', 'hover', 'color']), //eslint-disable-line
    footerBoldColor: getDefaultColor(['footer', 'bold']),
    inputColor: getDefaultColor(['input', 'color']),
    InputFocusColor: getDefaultColor(['input', 'focus', 'color']),
    addressesSwitchColor: getDefaultColor(['addresses', 'switch', 'color']),
    actionButtonBackground: getDefaultColor(['actionButton', 'background']),
    actionButtonBorderColor: getDefaultColor(['actionButton', 'borderColor']),
    actionButtonTitleColor: getDefaultColor(['actionButton', 'title', 'color']),
    actionButtonSubtitleColor: getDefaultColor(['actionButton', 'subtitle', 'color']), //eslint-disable-line
    actionButtonIconFill: getDefaultColor(['actionButton', 'icon', 'fill']),
    actionButtonHoverBorderColor: getDefaultColor(['actionButton', 'hover', 'borderColor']), //eslint-disable-line
    textColor: getDefaultColor(['textColor']),
    dropdownColor: getDefaultColor(['dropdown', 'color']),
    dropdownBackground: getDefaultColor(['dropdown', 'background']),
    dropdownBorderColor: getDefaultColor(['dropdown', 'borderColor']),
  }

  const modifiedSecondaryColor =
    getDefaultColor(['secondary'], secondaryColor) ||
    Colr.fromHex(colors.primaryColor).darken(18).toHex()

  const finalColors = {
    ...colors,
    secondaryColor: modifiedSecondaryColor,
  }

  return finalColors
}

export default getColors
