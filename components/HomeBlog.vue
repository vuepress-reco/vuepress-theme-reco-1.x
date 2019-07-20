<template>
  <div class="home-blog" :class="recoShow?'reco-show': 'reco-hide'">
    <div class="hero" :style="{background: `url(${$frontmatter.bgImage || require('../images/home-bg.jpg')}) center/cover no-repeat`, ...bgImageStyle}">
      <h1>{{ data.heroText || $title || '午后南杂' }}</h1>

      <p class="description">{{ data.tagline || $description || 'Welcome to your vuePress-theme-reco site' }}</p>
      <p class="huawei" v-if="$themeConfig.huawei === true"><i class="iconfont reco-huawei" style="color: #fc2d38"></i>&nbsp;&nbsp;&nbsp;华为，为中华而为之！</p>
    </div>

    <div class="home-blog-wrapper">
      <!-- 博客列表 -->
      <note-abstract 
        v-if="showList"
        class="blog-list"
        :data="posts"
        :isHome="true"
        :currentPage="1"></note-abstract>
      <div class="info-wrapper">
         <img class="personal-img" :src="$frontmatter.faceImage || $themeConfig.logo" alt="hero"> 
         <h3 class="name" v-if="$themeConfig.author || $site.title">{{ $themeConfig.author || $site.title }}</h3>
         <div class="num">
           <div>
             <h3>{{getPagesLength}}</h3>
             <h6>文章</h6>
           </div>
           <div>
             <h3>{{$tags.length}}</h3>
             <h6>标签</h6>
           </div>
         </div>
         <hr>
         <h4><i class="iconfont reco-category"></i> 分类</h4>
         <ul class="category-wrapper">
          <li class="category-item" v-for="(item, index) in this.$categories.list" :key="index">
            <a :href="item.path">
              <span class="category-name">{{ item.name }}</span>
              <span class="post-num">{{ item.posts.length }}</span>
            </a>
          </li>
        </ul>
        <hr>
        <h4><i class="iconfont reco-tag"></i> 标签</h4>
        <div class="tags">
          <span 
            v-for="(item, index) in tags" 
            :key="index"
            :style="{ 'backgroundColor': item.color }"
            @click="getPagesByTags(item.name)">{{item.name}}</span>
        </div>
      </div>  
    </div>

    <Content class="home-center" custom/>

    <div class="footer">
      <span>
        <i class="iconfont reco-theme"></i>
        <a target="blank" href="https://vuepress-theme-reco.recoluan.com">VuePress-theme-reco</a>
      </span>
      <span v-if="$themeConfig.record">
        <i class="iconfont reco-beian"></i>
        <a>{{ $themeConfig.record }}</a>
      </span>
      <span>
        <i class="iconfont reco-copyright"></i>
        <a>
          <span v-if="$themeConfig.startYear">{{ $themeConfig.startYear }} - </span>
          {{ year }}
          &nbsp;&nbsp;
          <span v-if="$themeConfig.author || $site.title">{{ $themeConfig.author || $site.title }}</span>
        </a>
      </span>
      <span>
        <AccessNumber idVal="/"></AccessNumber>
      </span>
    </div>
  </div>
</template>

<script>
import NavLink from "@theme/components/NavLink/";
import AccessNumber from '@theme/components/Valine/AccessNumber'
import NoteAbstract from '@theme/components/NoteAbstract.vue'
import { constants } from 'fs';

export default {
  components: { NavLink, AccessNumber, NoteAbstract },
  data () {
    return {
      recoShow: false,
      tags: [],
      showList: false
    }
  },
  computed: {
    // 时间降序后的博客列表
    posts () {
      let posts = this.$site.pages
      posts = posts.filter(item => {
        const { home, isTimeLine, date } = item.frontmatter
        return !(home == true || isTimeLine == true || date === undefined)
      })
      posts.sort((a, b) => {
        return this._getTimeNum(b) - this._getTimeNum(a)
      })
      return posts
    },

    // 分类信息
    getPagesLength () {
      let num = 0
      this.$categories.list.map(v => {
        num += v.posts.length
      })
      return num
    },
    year () {
      return new Date().getFullYear()
    },
    data() {
      return this.$frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    },

    heroImageStyle () {
      return this.data.heroImageStyle || {
        maxHeight: '200px',
        margin: '6rem auto 1.5rem'
      }
    },

    bgImageStyle () {
      const bgImageStyle = {
        height: '350px',
        textAlign: 'center',
        overflow: 'hidden'
      }
      return this.data.bgImageStyle ? { ...bgImageStyle, ...this.data.bgImageStyle } : bgImageStyle
    }
  },
  created () {
    if (this.$tags.list.length > 0) {
      let tags = this.$tags.list
      tags.map(item => {
        const color = this._tagColor()
        item.color = color
        return tags
      })
      this.tags = tags
    }
  },
  mounted () {
    this.recoShow = true
    this.showList = true
  },
  methods: {
    // 根据分类获取页面数据
    getPages () {
      let pages = this.$site.pages
      pages = pages.filter(item => {
        const { home, isTimeLine, date } = item.frontmatter
        return !(home == true || isTimeLine == true || date === undefined)
      })
      // reverse()是为了按时间最近排序排序
      this.pages = pages.length == 0 ? [] : pages
    },
    getPagesByTags (currentTag) {
      window.location.href = `/tag/#?tag=${currentTag}`
    },
    // 获取时间的数字类型
    _getTimeNum (data) {
      return parseInt(new Date(data.frontmatter.date).getTime())
    },
    _tagColor () {
      // 红、蓝、绿、橙、灰
      const tagColorArr = ['#f26d6d', '#3498db', '#67cc86', '#fb9b5f', '#838282']
      const index = Math.floor(Math.random() * tagColorArr.length)
      return tagColorArr[index]
    },
  }
};
</script>

<style lang="stylus">
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
      margin:10% auto 1.8rem ;
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
  .home-blog-title {
    margin 0 auto 10px
    max-width 960px
  }
  .home-blog-wrapper {
    display flex
    align-items: flex-start;
    margin 20px auto 0
    max-width 1126px
    .info-wrapper {
      transition all .3s
      margin-left 15px;
      width 380px;  
      height auto;
      box-shadow 0 2px 10px rgba(0,0,0,0.2);
      box-sizing border-box
      padding 0 15px
      &:hover {
        box-shadow: 0 4px 20px 0 rgba(0,0,0,0.2);
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
          padding: .4rem .8rem;
          border: 1px solid #999;
          transition: all .5s 
          &:first-child {
            border-top-right-radius: .25rem;
            border-top-left-radius: .25rem;
          }
          &:not(:first-child) {
            border-top: none;
          }
          &:hover {
            background #d3d3d3
          }
          a {
            display flex
            justify-content: space-between
            .post-num {
              width 1.6rem;
              height 1.6rem
              text-align center
              line-height 1.6rem
              border-radius 50%
              background #eee
              font-size .6rem
              color $textColor
            }
          }
        }
      }
      .tags {
        margin-bottom 30px
        span {
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
          &:hover {
            transform scale(1.04)
          }  
          &.active {
            transform scale(1.2)
          }  
        }  
      }         
    }
  }

  .features {
    max-width 1126px
    padding: 1.2rem 0;
    margin: 2.5rem auto 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 32%;
    transition: all .5s
    box-sizing border-box
    margin-bottom 10px
    padding 0 15px
    box-shadow 0 2px 10px rgba(0,0,0,0.2)
    h2 {
      font-size: 1.6rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 20%);
    }

    &:hover {
      transform scale(1.05)
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
    load-start()
    > span {
      margin-left 1rem
      > i {
        margin-right .5rem
      } 
    }
  }
}

&.reco-hide {
  .hero {
    img {
      load-start()
    }
    .h1 {
      load-start()
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
  .features {
    load-start()
  }
  .home-center {
    load-start()
    padding 0
  }
  .footer {
    load-start()
  }
}

&.reco-show {
  .hero {
    img {
      load-end(0.08s)
    }
    .h1 {
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
  .features {
    load-end(0.40s)
  }
  .home-center {
    load-end(0.48s)
  }
  .footer {
    load-end(0.56s)
  }
}

@media (max-width: $MQMobile) {
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
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
    .home-blog-wrapper {
      .info-wrapper {
        display none!important
      }
    }
  }
  .footer {
    text-align: left!important;
    > span {
      display block
      margin-left 0
      line-height 2rem
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

    .feature {
      h2 {
        font-size: 1.25rem;
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
