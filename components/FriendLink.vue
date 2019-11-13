<template>
  <div class="friend-link-wrapper">
    <div
      class="friend-link-item"
      v-for="(item, index) in $themeConfig.friendLink"
      :key="index"
      @mouseenter="showDetail($event, item)"
      @mouseleave="hideDetail"
      target="_blank">
      <span
        class="list-style"
        :style="{ 'backgroundColor': _tagColor() }">
      </span>
      {{item.title}}
    </div>
    <transition name="fade">
      <div
        @mouseenter="windowEnter"
        @mouseleave="windowLeave"
        class="popup-window"
        v-if="showDetailStatus"
        :style="popupWindowStyle"
        ref="popupWindow">
        <div class="avatar">
          <img :src="`http://1.gravatar.com/avatar/${getMd5(detailData.email || '')}?s=50&amp;d=mm&amp;r=x`" />
        </div>
        <div class="info">
          <div class="title">
            <h4>{{ detailData.title }}</h4>
            <a
              class="btn-go"
              :style="{ 'backgroundColor': _tagColor() }"
              :href="detailData.link"
              target="_blank">GO</a>
          </div>
          <p>{{ detailData.desc }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import md5 from 'md5'
import mixin from '@theme/mixins/index.js'

export default {
  mixins: [mixin],
  data () {
    return {
      detailData: {},
      showDetailStatus: false,
      popupWindowStyle: {},
      btnEnterStatus: false,
      windowEnterStatus: false
    }
  },
  methods: {
    getMd5 (str) {
      return md5(str)
    },
    showDetail (e, info) {
      this.btnEnterStatus = true
      const currentDom = e.target
      const { offsetTop, offsetLeft, clientWidth } = currentDom
      this.popupWindowStyle = {
        left: ((offsetLeft + clientWidth / 2) - 300 / 2) + 'px',
        top: (offsetTop - 150) + 'px'
      }
      this.detailData = info
      this.showDetailStatus = true
      this.$nextTick(() => {
        this._adjustPosition()
      })
    },
    hideDetail () {
      // this.btnEnterStatus = false
      // if (this.windowEnterStatus === false) this.showDetailStatus = false
    },
    windowEnter () {
      this.windowEnterStatus = true
      this.showDetailStatus = true
    },
    windowLeave () {
      // this.windowEnterStatus = false
      // if (this.btnEnterStatus === false) this.showDetailStatus = false
    },
    _adjustPosition () {
      const { offsetWidth } = document.body
      const { x, width } = this.$refs.popupWindow.getBoundingClientRect()
      const distanceToRight = offsetWidth - (x + width)
      if (distanceToRight < 0) {
        const { offsetLeft } = this.$refs.popupWindow
        this.popupWindowStyle = {
          ...this.popupWindowStyle,
          left: offsetLeft + distanceToRight + 'px'
        }
      }
    }
  },
  watch: {
    showDetailStatus (val) {
      if (val) {
        let [prevX, prevY, nextX, nextY] = [0, 0, 0, 0]

        window.addEventListener('mouseend', (e) => {
          prevX = nextX
          prevY = nextY
          nextX = e.x
          nextY = e.y
          // console.log(prevX, prevY, nextX, nextY)
          console.log(Math.atan2(nextY - prevY, nextX - prevX))
          if (Math.atan2(nextY - prevY, nextX - prevX) > -1.75 && Math.atan2(nextY - prevY, nextX - prevX)< -0.75) {
            this.showDetailStatus = true
          } else {
            this.showDetailStatus = false
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/recoConfig.styl'

.friend-link-wrapper
  position relative
  margin 30px 0
  .friend-link-item
    position relative
    vertical-align: middle;
    margin: 4px 4px 10px;
    padding: 4px 8px 4px 20px;
    line-height 20px
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
  .popup-window
    position absolute
    display flex
    background #ffffff
    box-shadow $boxShadow
    box-sizing border-box
    padding .4rem
    width 300px
    height 150px
    .avatar
      margin-right .4rem
      width 2rem
      height 2rem
      border-radius $borderRadius
      overflow hidden
      img
        width 2rem
        height 2rem
    .info
      flex 1
      .title
        display flex
        align-items center
        justify-content space-between
        height 2rem
        h4
          margin .2rem 0
        .btn-go
          width 1.4rem
          height 1.2rem
          border-radius $borderRadius
          font-size .1rem
          color #ffffff
          text-align center
          line-height 1.2rem
          cursor pointer

.fade-enter-active, .fade-leave-active
  transition opacity .5s
.fade-enter, .fade-leave-to
  opacity 0
</style>
