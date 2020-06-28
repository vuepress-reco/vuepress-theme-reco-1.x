export default {
  created () {
    switch (this.$themeConfig.codeTheme) {
      case 'coy':
        import('prismjs/themes/prism-coy.css')
        break
      case 'dark':
        import('prismjs/themes/prism-dark.css')
        break
      case 'funky':
        import('prismjs/themes/prism-funky.css')
        break
      case 'okaidia':
        import('prismjs/themes/prism-okaidia.css')
        break
      case 'solarizedlight':
        import('prismjs/themes/prism-solarizedlight.css')
        break
      case 'tomorrow':
        import('prismjs/themes/prism-tomorrow.css')
        break
      case 'twilight':
        import('prismjs/themes/prism-twilight.css')
        break
      default:
        import('prismjs/themes/prism.css')
        break
    }
  }
}
