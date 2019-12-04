import { compareTime } from '@theme/util'

// 过滤博客数据
export function filterPostData (posts, isTimeline) {
  posts = posts.filter(item => {
    const { title, frontmatter: { home, date, publish }} = item
    return isTimeline === true
      ? !(home == true || title == undefined || date === undefined || publish === false)
      : !(home == true || title == undefined || publish === false)
  })
  return posts
}

// 排序博客数据
export function sortPostData (posts) {
  posts.sort((a, b) => {
    const aSticky = a.frontmatter.sticky
    const bSticky = b.frontmatter.sticky
    if (aSticky && bSticky) {
      return aSticky == bSticky ? compareTime(a, b) : (aSticky - bSticky)
    } else if (aSticky && !bSticky) {
      return -1
    } else if (!aSticky && bSticky) {
      return 1
    }
    return compareTime(a, b)
  })
}
