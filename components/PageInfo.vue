<template>
  <div>
    <i
      class="iconfont reco-account"
      v-if="pageInfo.frontmatter.author || $themeConfig.author || $site.title">
      <span>{{ pageInfo.frontmatter.author || $themeConfig.author || $site.title }}</span>
    </i>
    <i class="iconfont reco-date" v-if="pageInfo.frontmatter.date"><span>{{ new Date(pageInfo.frontmatter.date).toLocaleDateString() }}</span></i>
    <AccessNumber :idVal="pageInfo.path" :numStyle="numStyle"></AccessNumber>
    <i class="iconfont reco-tag tags" v-if="pageInfo.frontmatter.tags">
      <span
        v-for="(subItem, subIndex) in pageInfo.frontmatter.tags"
        :key="subIndex"
        class="tag-item"
        :class="{ 'active': currentTag == subItem }"
        @click="goTags(subItem)">
        {{subItem}}
      </span>
    </i>
  </div>
</template>

<script>
import AccessNumber from './Valine/AccessNumber'

export default {
  components: { AccessNumber },
  props: ['pageInfo', 'currentTag'],
  data () {
    return {
      numStyle: {
        fontSize: '.9rem',
        fontWeight: 'normal',
        color: '#999'
      }
    }
  },
  
  methods: {
    goTags (tag) {
      window.location.href = `/tag/?tag=${tag}`
    }
  }
}
</script>

<style lang="stylus" scoped>

.iconfont
  display inline-block
  line-height 1.5rem
  &:not(:last-child)
    margin-right 1rem
  span 
    margin-left .5rem
.tags
  .tag-item
    cursor: pointer;
    &.active
      color $accentColor
    &:hover 
      color $accentColor

@media (max-width: $MQMobile)
  .tags
    display block
    margin-left: 0!important;
</style>
