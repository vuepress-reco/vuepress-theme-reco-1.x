<template>
  <div class="tags-wrapper" :class="recoShow?'reco-show': 'reco-hide'">
    <Common :sidebar="false" :isComment="false"></Common>
    <TagList :currentTag="currentTag" @getCurrentTag="tagClick"></TagList>
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
import TagList from '@theme/components/TagList.vue'
import NoteAbstract from '@theme/components/NoteAbstract.vue'

export default {
  components: { Common, NoteAbstract, TagList },
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
      const currentTag = this.$route.query.tag ? this.$route.query.tag : this.currentTag

      this.getPagesByTags(currentTag)
    }
  },

  mounted () {
    this.recoShow = true
  },

  methods: {

    async tagClick (currentTag) {
      await this.getPagesByTags(currentTag)
      window.scrollTo(0, 0)
    },

    // 根据分类获取页面数据
    getPagesByTags (currentTag) {
      this.currentTag = currentTag

      let posts = []
      if (currentTag !== '全部') {
        posts = this.$tags.map[currentTag].pages
        posts.sort((a, b) => {
          return this._getTimeNum(b) - this._getTimeNum(a)
        })
      } else {
        posts = this.handlePosts
      }

      // reverse()是为了按时间最近排序排序
      this.posts = posts.length == 0 ? [] : posts

      this._setPage(1)
    },

    getCurrentTag (tag) {
      this.$emit('currentTag', tag)
    },

    getCurrentPage (page) {
      this._setPage(page)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    },
    _setPage (page) {
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
@require '../styles/loadMixin.styl'
.tags-wrapper
  max-width: 740px;
  margin: 0 auto;
  padding: 4.6rem 2.5rem 0;
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