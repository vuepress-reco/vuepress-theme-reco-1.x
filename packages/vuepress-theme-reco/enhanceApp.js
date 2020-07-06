import postMixin from '@theme/mixins/posts'
import localMixin from '@theme/mixins/locales'

export default ({
  Vue,
  siteData,
  isServer
}) => {
  Vue.mixin(postMixin)
  Vue.mixin(localMixin)
  if (!isServer) {
    _registerCodeThemeCss(siteData.themeConfig.codeTheme)
  }
}

function _registerCodeThemeCss (theme = 'tomorrow') {
  const themeArr = ['tomorrow', 'funky', 'okaidia', 'solarizedlight', 'default']

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = `//prismjs.com/themes/prism${themeArr.indexOf(theme) > -1 ? `-${theme}` : ''}.css`

  document.head.append(link)
}
