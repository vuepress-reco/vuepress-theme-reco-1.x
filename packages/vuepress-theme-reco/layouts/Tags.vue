<template>
  <Common  class="tags-wrapper" :sidebar="false">
    <!-- 标签集合 -->
    <ModuleTransition>
      <TagList
        v-show="recoShowModule"
        :currentTag="$recoLocales.all"
        @getCurrentTag="tagClick"></TagList>
    </ModuleTransition>

    <!-- 博客列表 -->
    <ModuleTransition delay="0.08">
      <note-abstract
        v-show="recoShowModule"
        class="list"
        :data="$recoPosts"
        @paginationChange="paginationChange"
      ></note-abstract>
    </ModuleTransition>
  </Common>
</template>

<script>
import { defineComponent, getCurrentInstance } from 'vue-demi'
import Common from '@theme/components/Common'
import TagList from '@theme/components/TagList'
import NoteAbstract from '@theme/components/NoteAbstract'
import { ModuleTransition } from '@vuepress-reco/core/lib/components'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'

export default defineComponent({
  mixins: [moduleTransitonMixin],
  components: { Common, NoteAbstract, TagList, ModuleTransition },

  setup (props, ctx) {
    const instance = getCurrentInstance().proxy

    const tagClick = (tagInfo) => {
      if (instance.$route.path !== tagInfo.path) {
        instance.$router.push({ path: tagInfo.path })
      }
    }

    const paginationChange = (page) => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }

    return { tagClick, paginationChange }
  }
})
</script>

<style src="../styles/theme.styl" lang="stylus"></style>

<style lang="stylus" scoped>
.tags-wrapper
  max-width: $contentWidth
  margin: 0 auto;
  padding: 4.6rem 2.5rem 0;

@media (max-width: $MQMobile)
  .tags-wrapper
    padding: 5rem 0.6rem 0;
</style>
