'use strict';

module.exports = {

  types: [
    {
      value: 'WIP',
      name : '💪  WIP:      未完待续'
    },
    {
      value: 'feat',
      name : '✨  feat:     新的功能'
    },
    {
      value: 'fix',
      name : '🐞  fix:      Bug 修复'
    },
    {
      value: 'refactor',
      name : '🛠  refactor: 功能重构'
    },
    {
      value: 'docs',
      name : '📚  docs:     文档相关'
    },
    {
      value: 'test',
      name : '🏁  test:     测试相关'
    },
    {
      value: 'chore',
      name : '🗯  chore:    琐碎事项'
    },
    {
      value: 'style',
      name : '💅  style:    优化代码结构或格式'
    },
    {
      value: 'revert',
      name : '⏪  revert:   回退 commit'
    }
  ],

  scopes: [
    'vuepress-theme-reco',
    'vuepress-plugin-back-to-top',
    'vuepress-plugin-comments',
    'vuepress-plugin-loading',
    'vuepress-plugin-pagation'
  ],
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
