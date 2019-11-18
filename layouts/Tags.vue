<template>
  <div class="tags-wrapper" :class="recoShow?'reco-show': 'reco-hide'">
    <Common :sidebar="false" :isComment="false">
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
    </Common>
  </div>
</template>

<script>
import Common from '@theme/components/Common.vue'
import TagList from '@theme/components/TagList.vue'
import NoteAbstract from '@theme/components/NoteAbstract.vue'
import mixin from '@theme/mixins/index.js'

export default {
  mixins: [mixin],
  components: { Common, NoteAbstract, TagList },
  data () {
    return {
      tags: [],
      currentTag: '全部',
      currentPage: 1,
      recoShow: false,
      allTagName: '全部'
    }
  },
  computed: {
    // 时间降序后的博客列表
    posts () {
      const currentTag = this.currentTag
      let posts = []

      if (currentTag !== '全部') {
        posts = this.$tags.map[currentTag].pages
      } else {
        posts = this.$themeConfig.posts
      }

      posts = this._filterPostData(posts)
      this._sortPostData(posts)
      posts = posts.length == 0 ? [] : posts
      this._setPage(1)
      return posts
    }
  },
  created () {
    if (this.$tags.list.length > 0) {
      this.currentTag = this.$route.query.tag ? this.$route.query.tag : this.currentTag
    }
  },

  mounted () {
    this.recoShow = true
  },

  methods: {

    tagClick (currentTag) {
      this.currentTag = currentTag
      window.scrollTo(0, 0)
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
