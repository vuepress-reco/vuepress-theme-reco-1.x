<template>
  <div class="tags-wrapper">
    <div class="tags">
      <span 
        v-for="(item, index) in tags" 
        :key="index"
        :class="{'active': item.tag == currentTag}"
        :style="{ 'backgroundColor': item.color }"
        @click="getPagesByTags(item.tag)">{{item.tag}}</span>
    </div>

    <note-abstract
      :data="pages"
      :currentPage="currentPage"
      :currentTag="currentTag"
      @currentTag="getCurrentTag"></note-abstract>
    
    <pagation
      :data="pages" 
      :currentPage="currentPage"
      @getCurrentPage="getCurrentPage"></pagation>
  </div>
</template>

<script>
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
        hasTags = [],
        newTags = []
    pages.forEach(page => {
      let tags = page.frontmatter.tags
      if (tags) {
        tags.forEach(tag => {
          if (hasTags.indexOf(tag) == -1) {
            hasTags.push(tag)
            const color = this.tagColor()
            newTags.push({
              tag,
              color
            })
          }
        })
        this.tags = newTags
      }
    })
    this.currentTag = this.tag != '' ? this.tag : hasTags[0]
    this.getPagesByTags(this.currentTag)
  },
  updated () {
    this.currentPage = this.$page.currentPage
  },
  methods: {
    // 根据分类获取页面数据
    getPagesByTags (tag) {
      this.$emit('tagChange')
      let pages = this.$site.pages
      this.currentTag = tag
      pages = pages.filter(item => {
        let tags = item.frontmatter.tags
        return tags && item.frontmatter.tags.indexOf(tag) > -1
      })
      // reverse()是为了按时间最近排序排序
      this.pages = pages.length == 0 ? [] : pages.reverse()
      this.getCurrentPage(1);
    },
    getCurrentPage (page) {
      this.currentPage = page
      this.$page.currentPage = page
    },
    getCurrentTag (tag) {
      this.currentTag = tag
    },
    tagColor () {
      // 红、蓝、绿、橙、灰
      const tagColorArr = ['#f26d6d', '#3498db', '#67cc86', '#fb9b5f', '#838282']
      const index = Math.floor(Math.random() * tagColorArr.length)
      return tagColorArr[index]
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
      color: #fff;
      font-size: 13px;
      box-shadow 0 1px 4px 0 rgba(0,0,0,0.2)
      transition: all .5s
      &:hover
        transform scale(1.04)
      &.active
        transform scale(1.2)

@media (max-width: $MQMobile)
  .tags-wrapper
    padding: 0 0.6rem;
</style>
