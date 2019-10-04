const path = require('path')

// Theme API.
module.exports = (options, ctx) => ({
  alias () {
    const { themeConfig, siteConfig } = ctx
    // resolve algolia
    const isAlgoliaSearch = (
      themeConfig.algolia ||
      Object.keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
    )
    return {
      '@AlgoliaSearchBox': isAlgoliaSearch
        ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, 'noopModule.js')
    }
  },

  plugins: [
    '@vuepress-reco/vuepress-plugin-back-to-top',
    '@vuepress-reco/vuepress-plugin-pagation',
    '@vuepress-reco/vuepress-plugin-screenfull',
    '@vuepress/active-header-links',
    ['@vuepress/plugin-blog', {
      permalink: '/:regular',
      frontmatters: [
        {
          id: 'tags',
          keys: ['tags'],
          path: '/tag/',
          layout: 'Tags',
          scopeLayout: 'Tag'
        },
        {
          id: 'categories',
          keys: ['categories'],
          path: '/categories/',
          layout: 'Categories',
          scopeLayout: 'Category'
        },
      ],
    }],
    '@vuepress/search',
    '@vuepress/plugin-nprogress',
    ['container', {
      type: 'tip',
      defaultTitle: {
        '/zh/': '提示'
      }
    }],
    ['container', {
      type: 'warning',
      defaultTitle: {
        '/zh/': '注意'
      }
    }],
    ['container', {
      type: 'danger',
      defaultTitle: {
        '/zh/': '警告'
      }
    }]
  ]
})
