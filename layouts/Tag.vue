<template>
  <div class="tag-wrapper" :class="recoShow ?'reco-show' : 'reco-hide'">
    <!-- 公共布局 -->
    <Common :sidebar="false" :isComment="false">
      <!-- 标签集合 -->
      <TagList class="tags" :currentTag="$currentTags.key" @getCurrentTag="tagClick"></TagList>

      <!-- 博客列表 -->
      <note-abstract
        class="list"
        :data="posts"
        :currentPage="currentPage"
        @currentTag="$currentTags.key"></note-abstract>

      <!-- 分页 -->
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
import NoteAbstract from '@theme/components/NoteAbstract.vue'
import TagList from '@theme/components/TagList.vue'
import mixin from '@theme/mixins/index.js'

export default {
  mixins: [mixin],
  components: { Common, NoteAbstract, TagList },

  data () {
    return {
      // 当前页码
      currentPage: 1,
      recoShow: false,
      currentTag: '全部'
    }
  },

  computed: {
    // 时间降序后的博客列表
    posts () {
      let posts = this.$currentTags.pages
      posts = this._filterPostData(posts)
      this._sortPostData(posts)
      return posts
    }
  },

  mounted () {
    this._setPage(this._getStoragePage())
    this.recoShow = true
  },

  methods: {
    // 获取当前tag
    getCurrentTag (tag) {
      this.$emit('currentTag', tag)
    },
    tagClick (tagInfo) {
      this.$router.push({ path: tagInfo.path })
    },
    // 获取当前页码
    getCurrentPage (page) {
      this._setPage(page)
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    },
    _setPage (page) {
      this.currentPage = page
      this.$page.currentPage = page
      this._setStoragePage(page)
    }
  },

  watch: {
    $route () {
      this._setPage(this._getStoragePage())
    }
  }
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>

<style lang="stylus" scoped>
@require '../styles/recoConfig.styl'
@require '../styles/loadMixin.styl'
.tag-wrapper
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
  .tag-wrapper
    padding: 4.6rem 1rem 0;
</style>
