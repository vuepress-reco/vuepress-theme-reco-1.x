<template>
  <div class="home-blog" :class="recoShow?'reco-show': 'reco-hide'">
    <div class="hero" :style="{background: `url(${$frontmatter.bgImage ? $withBase($frontmatter.bgImage) : require('../images/home-bg.jpg')}) center/cover no-repeat`, ...bgImageStyle}">
      <h1>{{ $frontmatter.heroText || $title || '午后南杂' }}</h1>

      <p class="description">{{ $description || 'Welcome to your vuePress-theme-reco site' }}</p>
      <p class="huawei" v-if="$themeConfig.huawei === true"><i class="iconfont reco-huawei" style="color: #fc2d38"></i>&nbsp;&nbsp;&nbsp;华为，为中华而为之！</p>
    </div>

    <div class="home-blog-wrapper">
      <div class="blog-list">
        <!-- 博客列表 -->
        <note-abstract
          :data="$themeConfig.posts"
          :hideAccessNumber="true"
          :currentPage="currentPage"></note-abstract>
        <!-- 分页 -->
        <pagation
          class="pagation"
          :total="$themeConfig.posts.length"
          :currentPage="currentPage"
          @getCurrentPage="getCurrentPage" />
      </div>
      <div class="info-wrapper">
        <img class="personal-img" :src="$frontmatter.faceImage ? $withBase($frontmatter.faceImage) : require('../images/home-head.png')" alt="hero">
        <h3 class="name" v-if="$themeConfig.author || $site.title">{{ $themeConfig.author || $site.title }}</h3>
        <div class="num">
          <div>
            <h3>{{$themeConfig.posts.length}}</h3>
            <h6>文章</h6>
          </div>
          <div>
            <h3>{{$tags.list.length}}</h3>
            <h6>标签</h6>
          </div>
        </div>
        <hr>
        <h4><i class="iconfont reco-category"></i> 分类</h4>
        <ul class="category-wrapper">
          <li class="category-item" v-for="(item, index) in this.$categories.list" :key="index">
            <router-link :to="item.path">
              <span class="category-name">{{ item.name }}</span>
              <span class="post-num" :style="{ 'backgroundColor': _tagColor() }">{{ item.pages.length }}</span>
            </router-link>
          </li>
        </ul>
        <hr>
        <h4 v-if="$tags.list.length !== 0"><i class="iconfont reco-tag"></i> 标签</h4>
        <TagList @getCurrentTag="getPagesByTags" />
        <h4 v-if="$themeConfig.friendLink && $themeConfig.friendLink.length !== 0"><i class="iconfont reco-friend"></i> 友链</h4>
        <FriendLink />
      </div>
    </div>

    <Content class="home-center" custom/>
  </div>
</template>

<script>
import TagList from '@theme/components/TagList.vue'
import FriendLink from '@theme/components/FriendLink.vue'
import NoteAbstract from '@theme/components/NoteAbstract.vue'
import mixin from '@theme/mixins/index.js'

export default {
  mixins: [mixin],
  components: { NoteAbstract, TagList, FriendLink },
  data () {
    return {
      recoShow: false,
      currentPage: 1,
      tags: []
    }
  },
  computed: {
    actionLink () {
      const {
        actionLink: link,
        actionText: text
      } = this.$frontmatter

      return {
        link,
        text
      }
    },
    heroImageStyle () {
      return this.$frontmatter.heroImageStyle || {
        maxHeight: '200px',
        margin: '6rem auto 1.5rem'
      }
    },
    bgImageStyle () {
      const initBgImageStyle = {
        height: '350px',
        textAlign: 'center',
        overflow: 'hidden'
      }
      const {
        bgImageStyle
      } = this.$frontmatter

      return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
    },
    heroHeight () {
      return document.querySelector('.hero').clientHeight
    }
  },
  mounted () {
    this.recoShow = true
    this._setPage(this._getStoragePage())
  },
  methods: {
    // 获取当前页码
    getCurrentPage (page) {
      this._setPage(page)
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight)
      }, 100)
    },
    // 根据分类获取页面数据
    getPages () {
      let pages = this.$site.pages
      pages = pages.filter(item => {
        const { home, date } = item.frontmatter
        return !(home == true || date === undefined)
      })
      // reverse()是为了按时间最近排序排序
      this.pages = pages.length == 0 ? [] : pages
    },
    getPagesByTags (tagInfo) {
      this.$router.push({ path: tagInfo.path })
    },
    _setPage (page) {
      this.currentPage = page
      this.$page.currentPage = page
      this._setStoragePage(page)
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/recoConfig.styl'
@require '../styles/loadMixin.styl'

.home-blog {
  padding: $navbarHeight 0 0;
  margin: 0px auto;

  .hero {
    figure {
      position absolute
      background yellow
    }

    h1 {
      margin:7rem auto 1.8rem;
      font-size: 2.5rem;
      color #fff;
    }

    h1, .description, .action, .huawei {
      color #fff!important
    }

    .description {
      margin: 1.8rem auto;
      font-size: 1.6rem;
      line-height: 1.3;
      color: lighten($textColor, 20%);
    }
  }
  .home-blog-wrapper {
    display flex
    align-items: flex-start;
    margin 20px auto 0
    max-width 1126px
    .abstract-wrapper {
      .abstract-item:last-child {
        margin-bottom: 0px;
      }
    }
    .blog-list {
      flex auto
    }
    .info-wrapper {
      position: -webkit-sticky;
      position: sticky;
      top: 70px;
      transition all .3s
      margin-left 15px;
      flex 0 0 300px
      height auto;
      box-shadow $boxShadow;
      border-radius $borderRadius
      box-sizing border-box
      padding 0 15px
      &:hover {
        box-shadow: $boxShadowHover;
      }
      .personal-img {
        display block
        margin 2rem auto
        width 8rem
        height 8rem
      }
      .name {
        text-align center
      }
      .num {
        display flex
        margin 0 auto 1rem
        width 80%
        > div {
          text-align center
          flex auto
          &:first-child {
            border-right 1px solid #333
          }
          h3 {
            line-height auto
            margin 0 0 .6rem
            color $textColor
          }
          h6 {
            line-height auto
            margin 0
          }
        }
      }
      .category-wrapper {
        list-style none
        padding-left 0
        .category-item {
          margin-bottom .4rem
          padding: .4rem .8rem;
          transition: all .5s
          border-radius $borderRadius
          box-shadow $boxShadow
          &:hover {
            transform scale(1.04)
          }
          a {
            display flex
            justify-content: space-between
            .post-num {
              width 1.6rem;
              height 1.6rem
              text-align center
              line-height 1.6rem
              border-radius $borderRadius
              background #eee
              font-size .6rem
              color #fff
            }
          }
        }
      }
    }
  }
}

.reco-hide {
  .hero {
    img {
      load-start()
    }
    h1 {
      load-start()
      color red
    }
    .description {
      load-start()
    }
    .huawei {
      load-start()
    }
    .action-button {
      load-start()
    }
  }
  .home-blog-wrapper {
    load-start()
  }
  .home-center {
    load-start()
    padding 0
  }
}

.reco-show {
  .hero {
    img {
      load-end(0.08s)
    }
    h1 {
      load-end(0.16s)
    }
    .description {
      load-end(0.24s)
    }
    .huawei {
      load-end(0.32s)
    }
    .action-button {
      load-end(0.4s)
    }
  }
  .home-blog-wrapper {
    load-end(0.48s)
  }
  .home-center {
    load-end(0.56s)
  }
}

@media (max-width: $MQMobile) {
  .home-blog {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    .hero {
      margin 0 -1.5rem
      height 450px
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 6rem auto 1.8rem ;
        font-size: 2rem;
      }

      h1, .description, .action {
        // margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }
    .home-blog-wrapper {
      .info-wrapper {
        display none!important
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      margin 0 -1.5rem
      height 350px
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 6rem auto 1.8rem ;
        font-size: 2rem;
      }

      h1, .description, .action {
        // margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      .info-wrapper {
        display none!important
      }
    }
  }
}
</style>
