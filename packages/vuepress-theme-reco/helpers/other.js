/* eslint-disable no-proto */
import { addLinkToHead } from './utils'
export function getOneColor () {
  const tagColorArr = [
    '#e15b64',
    '#f47e60',
    '#f8b26a',
    '#abbd81',
    '#849b87',
    '#e15b64',
    '#f47e60',
    '#f8b26a',
    '#f26d6d',
    '#67cc86',
    '#fb9b5f',
    '#3498db'
  ]
  const index = Math.floor(Math.random() * tagColorArr.length)
  return tagColorArr[index]
}

export function registerCodeThemeCss (theme = 'tomorrow') {
  const themeArr = ['tomorrow', 'funky', 'okaidia', 'solarizedlight', 'default']
  const href = `//prismjs.com/themes/prism${
    themeArr.indexOf(theme) > -1 ? `-${theme}` : ''
  }.css`

  addLinkToHead(href)
}

export function interceptRouterError (router) {
  // 获取原型对象上的 push 函数
  const originalPush = router.__proto__.push
  // 修改原型对象中的p ush 方法
  router.__proto__.push = function push (location) {
    return originalPush.call(this, location).catch((err) => err)
  }
}

export function fixRouterError404 (router) {
  const routes = router.getRoutes()
  router.beforeEach((to, from, next) => {
    // 解决decode后反复重定向的问题
    const route = routes.find((v) => v.regex.test(to.path))

    // .html有重定向路由，无需特殊处理
    if (/\.html$/.test(to.path)) {
      return next()
    }

    // 不特殊处理 非通配符的 没有重定向的路由
    if (route && route.path !== '*' && !route.redirect) {
      return next()
    }

    // 解决中文标签/分类路由无法被正确加载的问题
    if (decodeURIComponent(to.path) !== to.path) {
      return next(
        Object.assign({}, to, {
          path: decodeURIComponent(to.path),
          fullPath: decodeURIComponent(to.fullPath)
        })
      )
    }

    next()
  })
}
