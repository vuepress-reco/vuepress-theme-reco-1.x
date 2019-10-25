<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

    <router-link
      :to="$localePath"
      class="home-link">
      <img
        class="logo"
        v-if="$themeConfig.logo"
        :src="$withBase($themeConfig.logo)"
        :alt="$siteTitle">
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle">{{ $siteTitle }}</span>
    </router-link>

    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}">

      <Theme v-if="hasThemes" />
      <Screenfull class="screenfull" />
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"/>
      <SearchBox v-else-if="$themeConfig.search !== false && $frontmatter.search !== false"/>
      <NavLinks class="can-hide"/>
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import Theme from '@theme/components/Theme'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox, Theme },

  data () {
    return {
      linksWrapMaxWidth: null,
      hasThemes: false,
      scroll: {
        navbarHeight: 0,
        elmObjs: null,
        top: 0,
        upHeight: 0,
        downHeight: 0
      }
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const { themePicker } = this.$themeConfig
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING -
          (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()

    if (this.$themeConfig.autoHideNavbar) {
      this.scroll.elmObjs = this.getScrollElmObjs()
      window.addEventListener('scroll', this.handleScroll)
    }
    window.addEventListener('resize', handleLinksWrapWidth, false)
    this.hasThemes = themePicker === undefined ? true : themePicker
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },
  methods: {
    handleScroll () {
      if (this.scroll === null) return
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      if (scrollTop > this.scroll.top) {
        this.scroll.downHeight += scrollTop - this.scroll.top
        this.scroll.upHeight = 0
        this.scroll.top = scrollTop
      }
      else {
        this.scroll.upHeight += this.scroll.top - scrollTop
        this.scroll.downHeight = 0
        this.scroll.top = scrollTop
      }

      if (this.scroll.downHeight > 150) {
        this.scroll.elmObjs.map((elmObj) => {
          const {elm, originTop} = elmObj
          if (elm !== null) {
            elm.style.top = originTop - this.scroll.navbarHeight + 'px'
          }
        })
      }
      else if (this.scroll.upHeight > 150) {
        this.scroll.elmObjs.map((elmObj) => {
          const {elm, originTop} = elmObj
          if (elm !== null) {
            elm.style.top = originTop + 'px'
          }
        })
      }
    },
    getScrollElmObjs () {
      const navbar = document.querySelector('.navbar')
      const sidebar = document.querySelector('.sidebar')
      const infoWrapper = document.querySelector('.info-wrapper')
      const navbarHeight = navbar.clientHeight
      this.scroll.navbarHeight = navbarHeight
      return [
        {elm: navbar, originTop: 0},
        {elm: sidebar, originTop: navbarHeight},
        {elm: infoWrapper, originTop: navbarHeight + 12}
      ]
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.path !== from.path) {
        // 切换页面重新获取滑动监听元素，防止某些页面特有元素在切换后
        // 仍为 null ，比如博客主页独有的 info-wrapper
        if (this.$themeConfig.autoHideNavbar) {
          this.scroll.elmObjs = this.getScrollElmObjs()
        }
      }
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
@require '../styles/recoConfig.styl'

$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  box-shadow $boxShadow
  transition all ease-in-out
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.2rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top
    .screenfull
      margin-right 1rem

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
</style>
