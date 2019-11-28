<template>
  <main class="page" :class="recoShow?'reco-show': 'reco-hide'">
    <slot name="top"/>

    <div class="page-title">
      <h1>{{$page.title}}</h1>
      <hr>
      <PageInfo :pageInfo="$page" :hideAccessNumber="hideAccessNumber"></PageInfo>
    </div>

    <Content class="theme-reco-content" />

    <footer class="page-edit">
      <div
        class="edit-link"
        v-if="editLink"
      >
        <a
          :href="editLink"
          target="_blank"
          rel="noopener noreferrer"
        >{{ editLinkText }}</a>
        <OutboundLink/>
      </div>

      <div
        class="last-updated"
        v-if="lastUpdated"
      >
        <span class="prefix">{{ lastUpdatedText }}: </span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </footer>

    <div class="page-nav" v-if="prev || next">
      <p class="inner">
        <span
          v-if="prev"
          class="prev"
        >
          ←
          <router-link
            v-if="prev"
            class="prev"
            :to="prev.path"
          >
            {{ prev.title || prev.path }}
          </router-link>
        </span>

        <span
          v-if="next"
          class="next"
        >
          <router-link
            v-if="next"
            :to="next.path"
          >
            {{ next.title || next.path }}
          </router-link>
          →
        </span>
      </p>
    </div>

    <slot name="bottom"/>
  </main>
</template>

<script>
import PageInfo from '@theme/components/PageInfo'
import { resolvePage, outboundRE, endingSlashRE } from '../util'

export default {
  components: { PageInfo },

  props: ['sidebarItems'],

  data () {
    return {
      recoShow: false,
      isHasKey: true
    }
  },

  computed: {
    hideAccessNumber () {
      const valineConfig = this.$themeConfig.valineConfig
      if (valineConfig) {
        return false
      } else {
        return true
      }
    },
    lastUpdated () {
      return this.$page.lastUpdated
    },
    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$themeConfig.lastUpdated === 'string') {
        return this.$themeConfig.lastUpdated
      }
      return 'Last Updated'
    },
    prev () {
      const prev = this.$frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },
    next () {
      const next = this.$frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },
    editLink () {
      if (this.$frontmatter.editLink === false) {
        return false
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$themeConfig

      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, this.$page.relativePath)
      }
      return ''
    },
    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText || this.$themeConfig.editLinkText || `Edit this page`
      )
    }
  },

  mounted () {
    this.recoShow = true
  },

  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : repo
        return (
          base.replace(endingSlashRE, '') +
           `/src` +
           `/${docsBranch}/` +
           (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
           path +
           `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`
      return (
        base.replace(endingSlashRE, '') +
        `/edit` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
        path
      )
    }
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items, offset) {
  const res = []
  flatten(items, res)
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset]
    }
  }
}

function flatten (items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}

</script>

<style lang="stylus">
@require '../styles/wrapper.styl'
@require '../styles/loadMixin.styl'

.page
  padding-top 5rem
  padding-bottom 2rem
  display block
  #time-line {
    margin-top 0
    padding-top 0
  }
  .page-title
    max-width: 740px;
    margin: 0 auto;
    padding: 1rem 2.5rem;
  .page-edit
    @extend $wrapper
    padding-top 1rem
    padding-bottom 1rem
    overflow auto
    .edit-link
      display inline-block
      a
        color lighten($textColor, 25%)
        margin-right 0.25rem
    .last-updated
      float right
      font-size 0.9em
      .prefix
        font-weight 500
        color lighten($textColor, 25%)
      .time
        font-weight 400
        color #aaa
  &.reco-hide.page {
    load-start()
  }
  &.reco-show.page {
    load-end(0.08s)
  }

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0
  .inner
    min-height 2rem
    margin-top 0
    border-top 1px solid $borderColor
    padding-top 1rem
    overflow auto // clear float
  .next
    float right

@media (max-width: $MQMobile)
  .page-title
    padding: 0 1rem;
  .page-edit
    .edit-link
      margin-bottom .5rem
    .last-updated
      font-size .8em
      float none
      text-align left

</style>
