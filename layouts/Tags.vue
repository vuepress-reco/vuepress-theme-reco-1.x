<template>
  <div class="tags-wrapper" :class="recoShow?'reco-show': 'reco-hide'">
    <Common :sidebar="false" :isComment="false"></Common>
    <div class="tags">
      <span
        v-for="(item, index) in tags"
        :key="index"
        :class="{'active': item.name == currentTag}"
        :style="{ 'backgroundColor': item.color }"
        @click="getPagesByTags(item.name)">{{item.name}}</span>
    </div>
    <note-abstract
      class="list"
      :data="posts"
      :currentPage="currentPage"
      :currentTag="currentTag"
      @currentTag="getCurrentTag"></note-abstract>

    <pagation
      class="pagation"
      :total="posts.length"
      :currentPage="currentPage"
      @getCurrentPage="getCurrentPage"></pagation>
  </div>
</template>

<script>
import Common from '@theme/components/Common.vue'
import NoteAbstract from '@theme/components/NoteAbstract.vue'
import Pagation from '@theme/components/Pagation.vue'
import mixin from '@theme/mixins/index.js'

export default {
  mixins: [mixin],
  components: { Common, NoteAbstract, Pagation },

  data () {
    return {
      posts: [],
      tags: [],
      currentTag: '全部',
      currentPage: 1,
      recoShow: false,
      allTagName: '全部'
    }
  },

  computed: {
    // 时间降序后的博客列表
    handlePosts () {
      let posts = this.$site.pages
      posts = posts.filter(item => {
        const { home, isTimeLine, date } = item.frontmatter
        return !(home == true || isTimeLine == true || date === undefined)
      })
      posts.sort((a, b) => {
        return this._getTimeNum(b) - this._getTimeNum(a)
      })
      return posts
    }
  },

  created () {
    if (this.$tags.list.length > 0) {
      const tags = this.$tags.list
      tags.map(item => {
        const color = this._tagColor()
        item.color = color
        return tags
      })
      this.tags = [{ name: '全部', color: this._tagColor() }, ...tags]

      this.getPagesByTags(this.currentTag)
    }
  },

  mounted () {
    this.recoShow = true
  },

  methods: {

    // 根据分类获取页面数据
    getPagesByTags (currentTag) {
      this.currentTag = currentTag

      let posts = []
      if (currentTag !== '全部') {
        posts = this.$tags.map[currentTag].posts
        posts.sort((a, b) => {
          return this._getTimeNum(b) - this._getTimeNum(a)
        })
      } else {
        posts = this.handlePosts
      }

      // reverse()是为了按时间最近排序排序
      this.posts = posts.length == 0 ? [] : posts

      this.getCurrentPage(1)
    },

    getCurrentTag (tag) {
      this.$emit('currentTag', tag)
    },

    getCurrentPage (page) {
      this.currentPage = page
      this.$page.currentPage = page
      window.scrollTo(0, 0)
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
@require '../styles/loadMixin.styl'
.tags-wrapper
  max-width: 740px;
  margin: 0 auto;
  padding: 4.6rem 2.5rem 0;
  .tags
    margin 30px 0
    span
      vertical-align: middle;
      margin: 4px 4px 10px;
      padding: 4px 8px;
      display: inline-block;
      cursor: pointer;
      border-radius: 2px;
      background: #fff;
      color: #fff;
      font-size: 13px;
      box-shadow 0 1px 4px 0 rgba(0,0,0,0.2)
      transition: all .5s
      &:hover
        transform scale(1.04)
      &.active
        transform scale(1.2)
  &.reco-hide {
    .tags, .list, .pagation {
      load-start()
    }
  }
  &.reco-show {
    .tags {
      load-end(0.08s)
    }
    .list {
      load-end(0.16s)
    }
    .pagation {
      load-end(0.24s)
    }
  }

@media (max-width: $MQMobile)
  .tags-wrapper
    padding: 5rem 0.6rem 0;
</style>