export default {
  methods: {
    _tagColor () {
      // 红、蓝、绿、橙、灰
      const tagColorArr = ['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87', '#e15b64', '#f47e60', '#f8b26a', '#f26d6d', '#67cc86', '#fb9b5f', '#3498db']
      const index = Math.floor(Math.random() * tagColorArr.length)
      return tagColorArr[index]
    },
    _filterPostData (posts, isTimeline) {
      posts = posts.filter(item => {
        const { home, date, publish } = item.frontmatter
        return isTimeline === true
          ? !(home == true || date === undefined || publish === false)
          : !(home == true || publish === false)
      })
      return posts
    },
    _sortPostData (posts) {
      posts.sort((a, b) => {
        return this._getTimeNum(b) - this._getTimeNum(a)
      })
    },
    // 获取时间的数字类型
    _getTimeNum (date) {
      return parseInt(new Date(date.frontmatter.date).getTime())
    }
  }
}
