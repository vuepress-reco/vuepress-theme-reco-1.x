<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">
    <Password v-if="!isHasKey"></Password>
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
        <Valine :isComment="isComment"></Valine>
      </div>
      
      <BackToTop></BackToTop>
    </div>
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from '../util'
import Password from '@theme/components/Password'
import Valine from '@theme/components/Valine/'
import BackToTop from "@theme/components/BackToTop"

export default {
  components: { Sidebar, Navbar, Password, Valine, BackToTop },

  props: ['sidebar', 'isComment'],

  data () {
    return {
      isSidebarOpen: false,
      isHasKey: true,
      isHasPageKey: true,
      nightMode: false
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        this.sidebar !== false
        && !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
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
          'no-sidebar': !this.shouldShowSidebar,
          'night-mode': this.nightMode
        },
        userPageClass
      ]
    }
  },

  mounted () {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })

    if (localStorage.getItem('nightMode')) {
      document.documentElement.style.background = "#000"
      this.nightMode = true
    }

    this.hasKey()
    this.hasPageKey()
  },

  methods: {
    hasKey () {
      const keyPage = this.$themeConfig.keyPage
      if (!keyPage) {
        this.isHasKey =  true
        return
      }

      const keys = keyPage.keys
      this.isHasKey = keys && keys.indexOf(sessionStorage.getItem('key')) > -1
    },
    hasPageKey () {
      const pageKeys = this.$frontmatter.keys
      if (!pageKeys) {
        this.isHasPageKey =  true
        return
      }

      this.isHasPageKey = pageKeys && pageKeys.indexOf(sessionStorage.getItem('pageKey')) > -1
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
    }
  },

  watch: {
    $frontmatter (newVal, oldVal) {
      if (newVal.home) {
        this.hasKey()
        this.hasPageKey()
      }
    }
  }
}
</script>
