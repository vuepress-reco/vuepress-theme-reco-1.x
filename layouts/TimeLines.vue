<template>
<div>
  <Common :sidebar="false" :isComment="false">
    <ul class="timeline-wrapper">
      <li class="desc">Yesterday Once More!</li>
      <li v-for="(item, index) in formatPagesArr" :key="index">
        <h3 class="year">{{item.year}}</h3>
        <ul class="year-wrapper">
          <li v-for="(subItem, subIndex) in item.data" :key="subIndex">
            <span class="date">{{dateFormat(subItem.frontmatter.date)}}</span>
            <span class="title" @click="go(subItem.path)">{{subItem.title}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Common>
</div>

</template>

<script>
import Common from '@theme/components/Common.vue'
import mixin from '@theme/mixins/index.js'

export default {
  mixins: [mixin],
  name: 'TimeLine',
  components: { Common },
  data () {
    return {
      pages: [],
      tags: [],
      currentTag: '',
      currentPage: 1,
      formatPages: {},
      formatPagesArr: []
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
    this.getPages()
  },
  methods: {
    // 根据分类获取页面数据
    getPages (tag) {
      let pages = this.$site.pages
      // 时间轴不进行制定处理
      pages = this._filterPostData(pages, true)
      // reverse()是为了按时间最近排序排序
      this.pages = pages.length == 0 ? [] : pages
      for (let i = 0, length = pages.length; i < length; i++) {
        const page = pages[i]
        const pageDateYear = this.dateFormat(page.frontmatter.date, 'year')
        if (this.formatPages[pageDateYear]) this.formatPages[pageDateYear].push(page)
        else {
          this.formatPages[pageDateYear] = [page]
        }
      }

      for (const key in this.formatPages) {
        const data = this.formatPages[key]
        this._sortPostData(data)
        this.formatPagesArr.unshift({
          year: key,
          data
        })
      }
    },
    renderTime (date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/')
    },
    // 时间格式化
    dateFormat (date, type) {
      date = this.renderTime(date)
      const dateObj = new Date(date)
      const year = dateObj.getFullYear()
      const mon = dateObj.getMonth() + 1
      const day = dateObj.getDate()
      if (type == 'year') return year
      else return `${mon}-${day}`
    },
    // 跳转
    go (url) {
      this.$router.push({ path: url })
    },
    // 获取时间的数字类型
    _getTimeNum (date) {
      return parseInt(new Date(date.frontmatter.date).getTime())
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/wrapper.styl'

.timeline-wrapper
  box-sizing border-box
  max-width: 740px;
  margin: 8rem auto 4rem;
  position relative
  list-style none
  &::after {
    content: " ";
    position: absolute;
    top: 14px;
    left: 0;
    margin-left: -2px;
    width: 4px;
    height: 100%;
    background: #f5f5f5;
  }
  .desc, .year {
    position: relative;
    color #666
    font-size 16px
    &:before {
      content: " ";
      position: absolute;
      z-index 2;
      left: -19px;
      top: 50%;
      margin-left: -4px;
      margin-top: -4px;
      width: 8px;
      height: 8px;
      background: #ddd;
      border-radius: 50%;
    }
  }
  .year {
    margin: 80px 0 0px;
    color #555
    font-weight: 700;
    font-size 26px
  }
  .year-wrapper {
    padding-left 0!important
    li {
      display flex
      padding 30px 0 10px
      list-style none
      border-bottom: 1px dashed #ccc;
      position relative
      &:hover {
        .date {
          color $accentColor
          &::before {
            background $accentColor
          }
        }
        .title {
          color $accentColor
        }
      }
      .date {
        width 40px
        line-height 30px
        color: #555;
        font-size 12px
        &::before {
          content: " ";
          position: absolute;
          left: -19px;
          top: 41px;
          width: 6px;
          height: 6px;
          margin-left: -4px;
          background: #ddd;
          border-radius: 50%;
          border: 1px solid #fff;
          z-index 2
        }
      }
      .title {
        line-height 30px
        color: #555;
        font-size 16px
        cursor pointer
      }
    }
  }
@media (max-width: $MQMobile)
  .timeline-wrapper
    margin: 0 1.2rem;
</style>
