<template>
  <div>
    <Common>
      <component v-if="$frontmatter.home" :is="homeCom"></component>
      <Page
        v-else
        :sidebar-items="sidebarItems">
        <slot
          name="page-top"
          slot="top"/>
        <slot
          name="page-bottom"
          slot="bottom"/>
      </Page>
      <Footer v-if="$frontmatter.home" class="footer" />
    </Common>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import HomeBlog from '@theme/components/HomeBlog.vue'
import Page from '@theme/components/Page.vue'
import Footer from '@theme/components/Footer.vue'
import Common from '@theme/components/Common.vue'
import { resolveSidebarItems } from '../util'

export default {
  components: { HomeBlog, Home, Page, Common, Footer },

  computed: {
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
    homeCom () {
      const { type } = this.$themeConfig
      if (type !== undefined) {
        return type == 'blog' ? 'HomeBlog' : type
      }
      return 'Home'
    }
  }
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="../styles/theme.styl" lang="stylus"></style>
