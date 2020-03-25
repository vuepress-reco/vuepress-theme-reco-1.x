import { compareDate } from '@theme/helpers/utils'

// 过滤博客数据
export function filterPosts (posts, isTimeline, $lang) {
  // 存在问题，当前函数被调用两次，第一次获取不到实例this，所以找不到 $lang，所以对这种情况做一下处理
  if ($lang === undefined) return posts
  posts = posts.filter((item, index) => {
    const { title, frontmatter: { home, date, publish, lang }} = item
    // 过滤多个分类时产生的重复数据
    if (posts.indexOf(item) !== index) {
      return false
    } else {
      const someConditions = home == true || title == undefined || publish === false || (lang !== undefined && lang !== $lang)
      const boo = isTimeline === true
        ? !(someConditions || date === undefined)
        : !someConditions
      return boo
    }
  })
  return posts
}

// 排序博客数据
export function sortPostsByStickyAndDate (posts) {
  posts.sort((prev, next) => {
    const prevSticky = prev.frontmatter.sticky
    const nextSticky = next.frontmatter.sticky
    if (prevSticky && nextSticky) {
      return prevSticky == nextSticky ? compareDate(prev, next) : (prevSticky - nextSticky)
    } else if (prevSticky && !nextSticky) {
      return -1
    } else if (!prevSticky && nextSticky) {
      return 1
    }
    return compareDate(prev, next)
  })
}

export function sortPostsByDate (posts) {
  posts.sort((prev, next) => {
    return compareDate(prev, next)
  })
}
