<template>
  <div class="friend-link-wrapper">
    <a
      v-for="(item, index) in $themeConfig.friendLink"
      :key="index"
      :href="item.link"
      target="_blank">
      <span
        class="list-style"
        :style="{ 'backgroundColor': _tagColor() }">
      </span>
      {{item.title}}
    </a>
  </div>
</template>

<script>
import mixin from '@theme/mixins/index.js'

export default {
  mixins: [mixin]
}
</script>

<style lang="stylus" scoped>
@require '../styles/recoConfig.styl'

.friend-link-wrapper
  margin 30px 0
  > a
    position relative
    vertical-align: middle;
    margin: 4px 4px 10px;
    padding: 4px 8px 4px 20px;
    display: inline-block;
    cursor: pointer;
    border-radius: $borderRadius
    background: #fff;
    font-size: 13px;
    box-shadow $boxShadow
    transition: all .5s
    .list-style
      position absolute
      left .4rem
      top 0
      bottom 0
      margin auto
      display block
      width .4rem
      height .4rem
      border-radius .1rem
      background $accentColor
      content ''
    &:hover
      transform scale(1.04)
</style>
