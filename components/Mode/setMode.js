import modeOptions from './modeOptions'

export function activateMode (mode) {
  console.log(mode)
  const rootElement = document.querySelector(':root')
  const options = modeOptions[mode]

  for (const k in options) {
    rootElement.style.setProperty(k, options[k])
  }
}

export function activateDarkMode () {
  const rootElement = document.querySelector(':root')
  const darkTheme = {
    '--background-color': '#25272a',
    '--box-shadow': '0 1px 6px 0 rgba(0, 0, 0, .9)',
    '--box-shadow-hover': '0 2px 26px 0 rgba(0, 0, 0, .9)'
  }
  for (const k in darkTheme) {
    rootElement.style.setProperty(k, darkTheme[k])
  }
}

export function activateLightMode () {
  const rootElement = document.querySelector(':root')
  const lightTheme = {
    '--background-color': '#fff',
    '--box-shadow': '0 1px 6px 0 rgba(0, 0, 0, 0.2)',
    '--box-shadow-hover': '0 2px 16px 0 rgba(0, 0, 0, 0.2)'
  }
  for (const k in lightTheme) {
    rootElement.style.setProperty(k, lightTheme[k])
  }
}
/**
 * Sets a color scheme for the website.
 * If browser supports "prefers-color-scheme" it will respect the setting for light or dark mode
 * otherwise it will set a dark theme during night time
 */
export default function setMode () {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
  const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified

  window.matchMedia('(prefers-color-scheme: dark)').addListener(e => e.matches && activateMode('dark'))
  window.matchMedia('(prefers-color-scheme: light)').addListener(e => e.matches && activateMode('light'))

  if (isDarkMode) activateMode('dark')
  if (isLightMode) activateMode('light')
  if (isNotSpecified || hasNoSupport) {
    console.log('You specified no preference for a color scheme or your browser does not support it. I schedule dark mode during night time.')
    const now = new Date()
    const hour = now.getHours()
    if (hour < 4 || hour >= 16) {
      activateMode('dark')
    }
  }
}
