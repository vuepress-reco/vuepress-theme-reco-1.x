<template>
  <div class="tags-wrapper">
    <div class="tags">
      <span 
        v-for="(tag, index) in tags" 
        :key="index"
        :class="{'active': tag == trueCurrentTag}"
        @click="getPagesByTags(tag)">{{tag}}</span>
    </div>

    <note-abstract
      :data="pages"
      :currentPage="currentPage"
      @currentTag="getCurrentTag"></note-abstract>
    
    <pagation
      :data="pages" 
      @getCurrentPage="getCurrentPage"></pagation>
  </div>
</template>

<script>
import { setStorage, getStorage } from '../../util/handleStorage'
import NoteAbstract from '../NoteAbstract/'
import Pagation from '../Pagation/'

export default {

  data () {
    return {
      pages: [],
      tags: [],
      currentTag: '',
      currentPage: 1
    }
  },
  props: {
    tag: {
      type: String,
      default: ''
    }
  },
  computed: {
    trueCurrentTag () {
      return this.currentTag
    }
  },
  created () {
    let pages = this.$site.pages,
        newTags = []
    pages.forEach(page => {
      let tags = page.frontmatter.tags
      if (tags) {
        tags.forEach(tag => {
          if (newTags.indexOf(tag) == -1) {
            newTags.push(tag)
          }
        })
        this.tags = newTags
      }
      
    })
    if (this.currentTag != '') {
      this.getPagesByTags(this.currentTag)
    }
    this.currentTag = this.tag
  },
  updated () {
    this.currentPage = getStorage('currentPage')
  },
  methods: {
    // 根据分类获取页面数据
    getPagesByTags (tag) {
      let pages = this.$site.pages
      this.currentTag = tag
      pages = pages.filter(item => {
        let tags = item.frontmatter.tags
        return tags && item.frontmatter.tags.indexOf(tag) > -1
      })
      // reverse()是为了按时间最近排序排序
      this.pages = pages.length == 0 ? [] : pages.reverse()
    },
    getCurrentPage (page) {
      this.currentPage = page
      setStorage('currentPage', page)
    },
    getCurrentTag (tag) {
      this.currentTag = tag
    }
  },
  watch: {
    currentTag (newTag) {
      this.getPagesByTags(newTag)
    }
  },
  components: {
    NoteAbstract,
    Pagation
  }
}
</script>

<style lang="stylus" scoped>
@import '../../styles/config.styl'
@require '../../styles/wrapper.styl'

.tags-wrapper
  max-width: 740px;
  margin: 0 auto;
  padding: 0 2.5rem;
  .tags
    margin-bottom 30px
    span
      vertical-align: middle;
      margin: 4px 4px 10px;
      padding: 4px 8px;
      display: inline-flex;
      cursor: pointer;
      border-radius: 2px;
      background: #fff;
      color: #999;
      font-size: 13px;
      box-shadow 0 1px 4px 0 rgba(0,0,0,0.2)
      transition: all .5s
      &:hover
        transform scale(1.04)
      &.active
        background $accentColor
        color #fff

@media (max-width: $MQMobile)
  .tags-wrapper
    padding: 4rem 0.6rem 0;
</style>
