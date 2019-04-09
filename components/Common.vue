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
      <slot></slot>
      <Valine :isComment="isComment"></Valine>
    </div>
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from '../util'
import Password from '@theme/components/Password'
import Valine from '@theme/components/Valine/'

export default {
  components: { Sidebar, Navbar, Password, Valine },

  props: ['sidebar', 'isComment'],

  data () {
    return {
      isSidebarOpen: false,
      isHasKey: true
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
      const userPageClass = this.$page.frontmatter.pageClass
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

  mounted () {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })

    const keyPage = this.$site.themeConfig.keyPage
    if (!keyPage) {
      this.isHasKey =  true
    }
    
    const {keys} = keyPage
    this.isHasKey = keys.indexOf(sessionStorage.getItem('key')) > -1
  },

  methods: {
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
  }
}
</script>
