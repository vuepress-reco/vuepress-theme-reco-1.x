import modeOptions from './modeOptions'

function activateMode (mode) {
  const rootElement = document.querySelector(':root')
  const options = modeOptions[mode]

  for (const k in options) {
    rootElement.style.setProperty(k, options[k])
  }
}

// Dark and Light autoswitches
const onDark = (e) => e.matches && activateMode('dark')
const onLight = (e) => e.matches && activateMode('light')

const darkScheme = window.matchMedia('(prefers-color-scheme: dark)')
const lightScheme = window.matchMedia('(prefers-color-scheme: light)')

/**
 * Sets a color scheme for the website.
 * If browser supports "prefers-color-scheme" it will respect the setting for light or dark mode
 * otherwise it will set a dark theme during night time
 */
export default function setMode (mode = 'auto') {
  if (mode !== 'auto') {
    darkScheme.removeListener(onDark)
    lightScheme.removeListener(onLight)
    activateMode(mode)
    return
  }

  const isDarkMode = darkScheme.matches
  const isLightMode = lightScheme.matches
  const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified

  darkScheme.addListener(onDark)
  lightScheme.addListener(onLight)

  if (isDarkMode) activateMode('dark')
  if (isLightMode) activateMode('light')
  if (isNotSpecified || hasNoSupport) {
    console.log('You specified no preference for a color scheme or your browser does not support it. I schedule dark mode during night time.')
    const now = new Date()
    const hour = now.getHours()
    if (hour < 6 || hour >= 18) {
      activateMode('dark')
    }
  }
}
