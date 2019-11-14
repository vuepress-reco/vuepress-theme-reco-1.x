<template>
  <div class="tags">
    <span
      v-for="(item, index) in $tags.list"
      :key="index"
      :class="{'active': item.name == currentTag}"
      :style="{ 'backgroundColor': _tagColor() }"
      @click="tagClick(item.name)">{{item.name}}</span>
  </div>
</template>

<script>
import mixin from '@theme/mixins/index.js'

export default {
  mixins: [mixin],
  props: {
    currentTag: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tags: []
    }
  },
  methods: {
    tagClick (tag) {
      this.$emit('getCurrentTag', tag)
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/recoConfig.styl'

.tags
  margin 30px 0
  span
    vertical-align: middle;
    margin: 4px 4px 10px;
    padding: 4px 8px;
    display: inline-block;
    cursor: pointer;
    border-radius: $borderRadius
    background: #fff;
    color: #fff;
    font-size: 13px;
    box-shadow $boxShadow
    transition: all .5s
    &:hover
      transform scale(1.04)
    &.active
      transform scale(1.2)
</style>
