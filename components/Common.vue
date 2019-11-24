<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">
    <div v-if="absoluteEncryption">
      <transition name="fade">
        <LoadingPage v-if="firstLoad" />
        <Password v-else-if="!isHasKey" />
        <div v-else>
          <Navbar
          v-if="shouldShowNavbar"
          @toggle-sidebar="toggleSidebar"/>

          <div
            class="sidebar-mask"
            @click="toggleSidebar(false)"></div>

          <Sidebar
            :items="sidebarItems"
            @toggle-sidebar="toggleSidebar">
            <slot
              name="sidebar-top"
              slot="top"/>
            <slot
              name="sidebar-bottom"
              slot="bottom"/>
          </Sidebar>

          <Password v-if="!isHasPageKey" :isPage="true"></Password>
          <div v-else>
            <slot></slot>
            <Comments :isShowComments="shouldShowComments"/>
          </div>
        </div>
      </transition>
    </div>
    <div v-else>
      <transition name="fade">
        <LoadingPage v-show="firstLoad" class="loading-wrapper" />
      </transition>
      <transition name="fade">
        <Password v-show="!isHasKey" class="password-wrapper-out" key="out" />
      </transition>
      <div :class="{ 'hide': firstLoad || !isHasKey }">
        <Navbar
        v-if="shouldShowNavbar"
        @toggle-sidebar="toggleSidebar"/>

        <div
          class="sidebar-mask"
          @click="toggleSidebar(false)"></div>

        <Sidebar
          :items="sidebarItems"
          @toggle-sidebar="toggleSidebar">
          <slot
            name="sidebar-top"
            slot="top"/>
          <slot
            name="sidebar-bottom"
            slot="bottom"/>
        </Sidebar>

        <Password v-show="!isHasPageKey" :isPage="true" class="password-wrapper-in" key="in"></Password>
        <div :class="{ 'hide': !isHasPageKey }">
          <slot></slot>
          <Comments :isShowComments="shouldShowComments"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from '../util'
import Password from '@theme/components/Password'
import { setTimeout } from 'timers'
import mixin from '@theme/mixins/index.js'

export default {
  mixins: [mixin],
  components: { Sidebar, Navbar, Password },

  props: {
    sidebar: {
      type: Boolean,
      default: true
    },
    isComment: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      isSidebarOpen: false,
      isHasKey: true,
      isHasPageKey: true,
      firstLoad: true
    }
  },

  computed: {
    absoluteEncryption () {
      return this.$themeConfig.keyPage && this.$themeConfig.keyPage.absoluteEncryption === true
    },
    // 是否显示评论
    shouldShowComments () {
      const { isShowComments, home } = this.$frontmatter
      return !(
        this.isComment == false ||
        isShowComments == false ||
        home == true
      )
    },

    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page

      if (
        frontmatter.navbar === false ||
        themeConfig.navbar === false
      ) return false

      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        this.sidebar !== false &&
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  created () {
    this._getPostData()
  },

  mounted () {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })

    this.hasKey()
    this.hasPageKey()
    this.handleLoading()
  },

  methods: {
    hasKey () {
      const keyPage = this.$themeConfig.keyPage
      if (!keyPage) {
        this.isHasKey = true
        return
      }

      const keys = keyPage.keys
      this.isHasKey = keys && keys.indexOf(sessionStorage.getItem('key')) > -1
    },
    hasPageKey () {
      const pageKeys = this.$frontmatter.keys
      if (!pageKeys) {
        this.isHasPageKey = true
        return
      }

      this.isHasPageKey = pageKeys && pageKeys.indexOf(sessionStorage.getItem(`pageKey${window.location.pathname}`)) > -1
    },
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },

    handleLoading () {
      const time = this.$frontmatter.home && sessionStorage.getItem('firstLoad') == undefined ? 1000 : 0
      setTimeout(() => {
        this.firstLoad = false
        if (sessionStorage.getItem('firstLoad') == undefined) sessionStorage.setItem('firstLoad', false)
      }, time)
    }
  },

  watch: {
    $frontmatter (newVal, oldVal) {
      this.hasKey()
      this.hasPageKey()
    }
  }
}
</script>

<style lang="stylus" scoped>
.theme-container
  .loading-wrapper
    position absolute
    z-index 22
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    background #fff
  .password-wrapper-out
    position absolute
    z-index 21
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    background #fff
  .password-wrapper-in
    position absolute
    z-index 8
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    background #fff
  .hide
    height 100vh
    overflow hidden
.theme-container.no-sidebar
  .comments-wrapper
    padding-left 2rem

.comments-wrapper
  padding 2rem 2rem 2rem 22rem
  max-width: 740px;
  margin: 0 auto;
@media (max-width: $MQNarrow)
  .theme-container.no-sidebar
    .comments-wrapper
      padding-left 2rem
  .comments-wrapper
    padding-left: 18.4rem;
@media (max-width: $MQMobile)
  .comments-wrapper
    padding-left: 2rem
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
