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
import setMode, { activateMode } from './setMode'

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

  mounted () {
    const mode = localStorage.getItem('mode')
    this.currentMode = mode === null ? 'auto' : mode
    if (mode === 'dark') {
      activateMode('dark')
    } else if (mode === 'light') {
      activateMode('light')
    }
  },

  methods: {
    selectMode (mode) {
      if (mode.mode === this.currentMode) {
        return
      } else if (mode.mode === 'dark') {
        activateMode('dark')
      } else if (mode.mode === 'light') {
        activateMode('light')
      } else if (mode.mode === 'auto') {
        setMode()
      }
      localStorage.setItem('mode', mode.mode)
      this.currentMode = mode.mode
    },
    getClass (mode) {
      return mode !== this.currentMode ? mode : `${mode} active`
    }
  }
}
</script>

<style lang="stylus">
@require '../../styles/mode.styl'

.mode-options
  background-color var(--background-color)
  min-width: 125px;
  margin: 0;
  padding: 1em;
  box-shadow var(--box-shadow);
  border-radius: $borderRadius;
  .title
    margin-top 0
    margin-bottom .6rem
    font-weight bold
    color var(--text-color)
  .color-mode-options
    display: flex;
    flex-wrap wrap
    li
      text-align: center;
      font-size 12px
      color var(--text-color)
      line-height 18px
      padding 3px 6px
      border-top 1px solid #666
      border-bottom 1px solid #666
      background-color var(--background-color)
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
