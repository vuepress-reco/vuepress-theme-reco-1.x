<template>
  <div class="theme-container" v-if="!noFoundPageByTencent">
    <div class="content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link to="/">Take me home.</router-link>
    </div>
  </div>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`
]

export default {
  computed: {
    noFoundPageByTencent () {
      return this.$themeConfig.noFoundPageByTencent !== false
    }
  },
  mounted () {
    if (this.noFoundPageByTencent) {
      const dom = document.createElement('script')
      dom.setAttribute('homePageName', '回到首页')
      dom.setAttribute('homePageUrl', '/')
      dom.setAttribute('src', '//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js')

      document.body.append(dom)
    }
  },
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>

<style lang="stylus" scoped>
.content {
  margin 4rem auto 0
  max-width 800px
  padding 0 2rem
}
</style>

