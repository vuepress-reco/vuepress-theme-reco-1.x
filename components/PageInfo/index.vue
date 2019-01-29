<template>
  <div>
    <i
      class="iconfont reco-account"
      v-if="pageInfo.frontmatter.author || $site.themeConfig.author || $site.title">
      <span>{{ pageInfo.frontmatter.author || $site.themeConfig.author || $site.title }}</span>
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
import AccessNumber from '../Valine/AccessNumber'

export default {
  data () {
    return {
      numStyle: {
        fontSize: '.9rem',
        fontWeight: 'normal',
        color: '#999'
      }
    }
  },
  props: ['pageInfo', 'currentTag'],
  components: { AccessNumber },
  methods: {
    goTags (tag) {
      this.$emit('currentTag', tag)
      this.$router.push({path: '/tags/'})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../styles/config.styl'

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

// @media (max-width: $MQMobile)
//   .tags
//     display block
//     margin-top 1rem;
//     margin-left: 0!important;
</style>
