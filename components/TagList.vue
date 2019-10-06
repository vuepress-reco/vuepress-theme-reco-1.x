<template>
  <div class="tags">
    <span
      v-for="(item, index) in tags"
      :key="index"
      :class="{'active': item.name == currentTag}"
      :style="{ 'backgroundColor': item.color }"
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
  created () {
    if (this.$tags.list.length > 0) {
      const tags = this.$tags.list
      tags.map(item => {
        const color = this._tagColor()
        item.color = color
        return tags
      })
      this.tags = [{ name: '全部', color: this._tagColor() }, ...tags]
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
.tags
  margin 30px 0
  span
    vertical-align: middle;
    margin: 4px 4px 10px;
    padding: 4px 8px;
    display: inline-block;
    cursor: pointer;
    border-radius: 2px;
    background: #fff;
    color: #fff;
    font-size: 13px;
    box-shadow 0 1px 4px 0 rgba(0,0,0,0.2)
    transition: all .5s
    &:hover
      transform scale(1.04)
    &.active
      transform scale(1.2)
</style>