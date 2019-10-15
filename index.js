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
    '@vuepress-reco/back-to-top',
    '@vuepress-reco/loading-page',
    '@vuepress-reco/pagation',
    '@vuepress-reco/screenfull',
    '@vuepress-reco/ga',
    ['@vuepress-reco/comments', {
      solution: 'valine',
      options: {
        appId: 'Q6hMeY2PSaM9FMkXetzoJoU5-gzGzoHsz',
        appKey: 'iLQlev5jo2Cm5pLcI0z3qhtr',
        placeholder: '填写邮箱可以收到回复提醒哦！',
        notify: true,
        recordIP: true
      }
    }],
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
        }
      ]
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
