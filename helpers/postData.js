import { compareDate } from '@theme/helpers/utils'

// 过滤博客数据
export function filterPosts (posts, isTimeline) {
  posts = posts.filter(item => {
    const { title, frontmatter: { home, date, publish }} = item
    return isTimeline === true
      ? !(home == true || title == undefined || date === undefined || publish === false)
      : !(home == true || title == undefined || publish === false)
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
