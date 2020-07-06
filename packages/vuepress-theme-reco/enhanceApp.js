import postMixin from '@theme/mixins/posts'
import localMixin from '@theme/mixins/locales'

function _registerCodeThemeCss (theme = 'tomorrow') {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  if (theme === '') {
    link.href = `http://prismjs.com/themes/prism.css`
  } else {
    link.href = `http://prismjs.com/themes/prism-${theme}.css`
  }
  document.head.append(link)
}

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
