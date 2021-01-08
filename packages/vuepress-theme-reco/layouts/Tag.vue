<template>
  <!-- 公共布局 -->
  <Common class="tag-wrapper" :sidebar="false">
    <!-- 标签集合 -->
    <ModuleTransition>
      <TagList
        v-show="recoShowModule"
        class="tags"
        :currentTag="$currentTags.key"
        @getCurrentTag="tagClick"></TagList>
    </ModuleTransition>

    <!-- 博客列表 -->
    <ModuleTransition delay="0.08">
      <note-abstract
        v-show="recoShowModule"
        class="list"
        :data="posts"
        :currentTag="$currentTags.key"
        @paginationChange="paginationChange"></note-abstract>
    </ModuleTransition>
  </Common>
</template>

<script>
import Common from '@theme/components/Common'
import NoteAbstract from '@theme/components/NoteAbstract'
import TagList from '@theme/components/TagList'
import { ModuleTransition } from '@vuepress-reco/core/lib/components'
import { sortPostsByStickyAndDate, filterPosts } from '@theme/helpers/postData'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'

export default {
  mixins: [moduleTransitonMixin],
  components: { Common, NoteAbstract, TagList, ModuleTransition },

  data () {
    return {
      currentTag: '全部'
    }
  },

  computed: {
    // 时间降序后的博客列表
    posts () {
      let posts = this.$currentTags.pages
      posts = filterPosts(posts)
      sortPostsByStickyAndDate(posts)
      return posts
    }
  },

  methods: {
    // 获取当前tag
    getCurrentTag (tag) {
      this.$emit('currentTag', tag)
    },
    tagClick (tagInfo) {
      if (this.$route.path !== tagInfo.path) {
        this.$router.push({ path: tagInfo.path })
      }
    },
    paginationChange (page) {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }
  }
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>

<style lang="stylus" scoped>

.tag-wrapper
  max-width: $contentWidth;
  margin: 0 auto;
  padding: 4.6rem 2.5rem 0;

@media (max-width: $MQMobile)
  .tag-wrapper
    padding: 4.6rem 1rem 0;
</style>
