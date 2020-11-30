'use strict';

module.exports = {

  types: [
    {
      value: 'WIP',
      name: '💪  WIP:      未完待续'
    },
    {
      value: 'feat',
      name: '✨  feat:     新的功能'
    },
    {
      value: 'fix',
      name: '🐞  fix:      Bug 修复'
    },
    {
      value: 'refactor',
      name: '🔨  refactor: 功能重构'
    },
    {
      value: 'perf',
      name: '🌸  perf:     性能优化'
    },
    {
      value: 'docs',
      name: '📚  docs:     文档相关'
    },
    {
      value: 'test',
      name: '🏁  test:     测试相关'
    },
    {
      value: 'build',
      name: '🧰  build:    构建或辅助工具的变动'
    },
    {
      value: 'style',
      name: '💅  style:    优化代码结构或格式'
    },
    {
      value: 'revert',
      name: '⏪  revert:   回退 commit'
    },
    {
      value: 'chore',
      name: '⚪  chore:    琐事，不属于以上任何类型'
    }
  ],

  scopes: [
    'vuepress-theme-reco',
    'core',
    'vuepress-plugin-back-to-top',
    'vuepress-plugin-comments',
    'vuepress-plugin-loading',
    'vuepress-plugin-pagation'
  ],
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
