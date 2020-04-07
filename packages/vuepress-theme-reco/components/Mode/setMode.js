import modeOptions from './modeOptions'

function activateMode (mode) {
  const rootElement = document.querySelector(':root')
  const options = modeOptions[mode]

  for (const k in options) {
    rootElement.style.setProperty(k, options[k])
  }
}

/**
 * Sets a color scheme for the website.
 * If browser supports "prefers-color-scheme", 'auto' mode will respect the setting for light or dark mode
 * otherwise it will set a dark theme during night time
 */
export default function setMode (mode = 'auto') {
  // Dark and Light autoswitches
  // 这里的声明需要挪到 setMode 函数中，否则 windows 会报错
  const onDark = (e) => e.matches && activateMode('dark')
  const onLight = (e) => e.matches && activateMode('light')

  const darkScheme = window.matchMedia('(prefers-color-scheme: dark)')
  const lightScheme = window.matchMedia('(prefers-color-scheme: light)')

  if (mode !== 'auto') {
    darkScheme.removeListener(onDark)
    lightScheme.removeListener(onLight)
    activateMode(mode)
    return
  }

  darkScheme.addListener(onDark)
  lightScheme.addListener(onLight)

  const isDarkMode = darkScheme.matches
  const isLightMode = lightScheme.matches

  if (isDarkMode) activateMode('dark')
  if (isLightMode) activateMode('light')

  if (!isDarkMode && !isLightMode) {
    console.log('You specified no preference for a color scheme or your browser does not support it. I schedule dark mode during night time.')
    const now = new Date()
    const hour = now.getHours()
    if (hour < 6 || hour >= 18) {
      activateMode('dark')
    }
  }
}
