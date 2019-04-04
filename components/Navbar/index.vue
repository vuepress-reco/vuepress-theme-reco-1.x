<template>
  <header class="navbar" id="navbarWrapper">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

    <router-link :to="$localePath" class="home-link">
      <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle">
      <span
        ref="siteName"
        class="site-name"
        v-if="$siteTitle">{{ $siteTitle }}</span>
    </router-link>

    <div class="links" :style="{
        'max-width': linksWrapMaxWidth + 'px'
      }">
      <Search class="side-search-wrapper"></Search>
      <NavLinks class="can-hide"/>
    </div>
  </header>
</template>

<script>
import SidebarButton from "./components/SidebarButton/";
import Search from '../Search/'
import NavLinks from "../NavLinks/";

export default {
  components: { SidebarButton, NavLinks, Search },

  data() {
    return {
      linksWrapMaxWidth: null
    };
  },

  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, "paddingLeft")) +
      parseInt(css(this.$el, "paddingRight"));
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null;
      } else {
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0);
      }
    };
    handleLinksWrapWidth();
    window.addEventListener("resize", handleLinksWrapWidth, false);
  },

  // 头部导航条的滚动

  // updated () {
  //   this.$nextTick(() => {
  //     // 头部导航条的滚动
  //     let oldScrollY = 0
  //     let oldTransformHeight = 0
  //     window.addEventListener('scroll', (e) => {
  //       const newScrollY = window.scrollY
  //       // 判断滚动方向
  //       const scrollDirection = newScrollY - oldScrollY > 0 ? 'up' : 'down'
        
  //       // 使用ref会间断性获取不到dom
  //       const navbarWrapper = document.querySelector('#navbarWrapper')
  //       const height = navbarWrapper.offsetHeight == 58 ? 58 : 58
  //       const transformHeight = scrollDirection == 'up' ? height : 0

  //       if (oldTransformHeight != transformHeight) {
  //         navbarWrapper.style.top = `-${transformHeight}px`
  //       }
        
  //       oldScrollY = newScrollY
  //       oldTransformHeight = transformHeight
  //     })
  //   })
  // },

  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    }
  }
};

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
}
</script>

<style lang="stylus">
@import '../../styles/config.styl';

$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

.navbar {
  transition all .4s
  padding: $navbar-vertical-padding $navbar-horizontal-padding;
  position: relative;
  -moz-user-select:none;/*火狐*/
  -webkit-user-select:none;/*webkit浏览器*/
  -ms-user-select:none;/*IE10*/
  -khtml-user-select:none;/*早期浏览器*/
  user-select:none;

  a, span, img {
    display: inline-block;
  }

  .home-link {
    line-height $navbarHeight - 1.4rem
  }  

  .logo {
    height: $navbarHeight - 1.4rem;
    min-width: $navbarHeight - 1.4rem;
    margin-right: 0.8rem;
    vertical-align: top;
  }

  .site-name {
    font-size: 1.2rem;
    color: $textColor;
    position: relative;
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    background-color: $bgColor;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: $navbar-horizontal-padding;
    top: $navbar-vertical-padding;
    display: flex;

    .nav-links {
      flex: 1;
    }
  }
}

@media (max-width: $MQMobile) {
  .navbar {
    transition all .5s

    .can-hide {
      display: none;
    }

    .links {
      padding-left: 1.5rem;
    }
    .side-search-wrapper {
      display none
    }  
  }
}
</style>
