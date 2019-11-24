<template>
  <div class="abstract-wrapper">
    <div v-if="listLoadType === 'sync'" key="sync">
      <NoteAbstractItem
        v-for="(item, index) in data"
        :key="item.path"
        :item="item"
        :currentPage="currentPage"
        :currentTag="currentTag"
        v-show="index >= (currentPage * 10 - 10) && index < currentPage * 10"/>
    </div>
    <div v-else-if="listLoadType === 'async'" key="async">
      <NoteAbstractItem
        v-for="(item) in currentPageData"
        :key="item.path"
        :item="item"
        :currentPage="currentPage"
        :currentTag="currentTag"
        :hideAccessNumber="true" />
    </div>
  </div>
</template>

<script>
import NoteAbstractItem from './NoteAbstractItem'

export default {
  components: { NoteAbstractItem },
  props: ['data', 'currentPage', 'currentTag', 'hideAccessNumber'],
  computed: {
    listLoadType () {
      const valineConfig = this.$themeConfig.valineConfig
      if (this.$frontmatter.home) return 'async'
      if (valineConfig && !valineConfig.hideListAccessNumber) {
        return 'sync'
      } else {
        return 'async'
      }
    },
    currentPageData () {
      const start = this.currentPage * 10 - 10
      const end = this.currentPage * 10
      return this.data.slice(start, end)
    }
  }
}
</script>

<style lang="stylus" scoped>
.abstract-wrapper
  width 100%
</style>
