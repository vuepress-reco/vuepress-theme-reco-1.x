<template>
  <div class="mode-options">
    <h4 class="title">Choose mode</h4>
    <ul class="color-mode-options">
      <li
        v-for="(mode, index) in modeOptions"
        :key="index"
        :class="getClass(mode.mode)"
        @click="selectMode(mode)"
      >{{ mode.title }}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'ModeOptions',

  data () {
    return {
      modeOptions: [
        { mode: 'dark', title: 'dark' },
        { mode: 'auto', title: 'auto' },
        { mode: 'light', title: 'light' }
      ],
      currentMode: 'auto'
    }
  },

  methods: {
    selectMode (mode) {
      if (mode.mode === this.currentMode) return
      this.currentMode = mode.mode
    },
    getClass (mode) {
      return mode !== this.currentMode ? mode : `${mode} active`
    }
  }
}
</script>

<style lang="stylus">
@require '../../styles/recoConfig.styl'

.mode-options
.title
  margin-top 0
  margin-bottom .6rem
  font-weight bold
  .color-mode-options
    display: flex;
    flex-wrap wrap
    li
      text-align: center;
      font-size 12px
      color #666
      line-height 18px
      padding 3px 6px
      border-top 1px solid #666
      border-bottom 1px solid #666
      background-color: #fff;
      cursor pointer
      &.dark
        border-radius: $borderRadius 0 0 $borderRadius
        border-left 1px solid #666
      &.light
        border-radius: 0 $borderRadius $borderRadius 0
        border-right 1px solid #666
      &.active
        background-color: $accentColor;
        color #fff
      &:not(.active)
        border-right 1px solid #666
</style>
