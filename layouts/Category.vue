<template>
  <div class="categories-wrapper">
    <!-- 公共布局 -->
    <Common :sidebar="false" :isComment="false">
      <!-- 页面标题 -->
      <h2 class="title">{{ title }}</h2>

      <!-- 博客列表 -->
      <note-abstract 
        :data="posts"
        :currentPage="currentPage"
        @currentTag="getCurrentTag"></note-abstract>
      
      <!-- 分页 -->
      <pagation 
        :data="posts"
        :currentPage="currentPage"
        @getCurrentPage="getCurrentPage"></pagation>
    </Common>
  </div>
</template>

<script>
import Common from '@theme/components/Common.vue'
import NoteAbstract from '../components//NoteAbstract.vue'
import Pagation from '../components//Pagation.vue'

export default {
  components: { Common, NoteAbstract, Pagation },

  data () {
    return {
      // 当前页码
      currentPage: 1
    }
  },

  computed: {
    // 时间降序后的博客列表
    posts () {
      let posts = this.$category.posts
      posts.sort((a, b) => {
        return this._getTimeNum(b) - this._getTimeNum(a)
      })
      return posts
    },
    // 标题只显示分类名称
    title () {
      return this.$page.frontmatter.title.split('|')[0]
    }
  },

  methods: {
    // 获取当前tag
    getCurrentTag (tag) {
      this.$emit('currentTag', tag)
    },
    // 获取当前页码
    getCurrentPage (page) {
      this.currentPage = page
      this.$page.currentPage = page
    },
    // 获取时间的数字类型
    _getTimeNum (date) {
      return parseInt(new Date(date.frontmatter.date).getTime())
    }
  }
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>

<style lang="stylus" scoped>
.categories-wrapper
  max-width: 740px;
  margin: 0 auto;
  padding: 4.6rem 2.5rem 0; 
  .title
    margin-bottom 3rem

@media (max-width: $MQMobile)
  .categories-wrapper
    padding: 4.6rem 1rem 0;
  .page-edit
    .edit-link
      margin-bottom .5rem
    .last-updated
      font-size .8em
      float none
      text-align left
</style>


