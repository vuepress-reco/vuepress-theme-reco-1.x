<template>
  <div>
    <Common>
      <Home v-if="$page.frontmatter.home"/>
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
    </Common>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Page from '@theme/components/Page.vue'
import Common from '@theme/components/Common.vue'
import { resolveSidebarItems } from '../util'

export default {
  components: { Home, Page, Common },

  computed: {
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    }
  }
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="../styles/theme.styl" lang="stylus"></style>
