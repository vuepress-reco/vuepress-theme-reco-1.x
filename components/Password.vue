<template>
  <div class="password-shadow">
    <Background></Background>
    <h3 class="title">{{isPage ? $frontmatter.title : $site.title}}</h3>
    <p class="description" v-if="!isPage">{{$site.description}}</p>
    <label class="inputBox" id="box">
      <input
        v-model="key"
        type="password"
        @keyup.enter="inter"
        @focus="inputFocus"
        @blur="inputBlur">
      <span>{{warningText}}</span>
      <button ref="passwordBtn" @click="inter">OK</button>
    </label>

    <div class="footer">
      <span>
        <i class="iconfont reco-theme"></i>
        <a target="blank" href="https://www.npmjs.com/package/vuepress-theme-reco">vuePress-theme-reco</a>
      </span>
      <span>
        <i class="iconfont reco-other"></i>
        <a>{{ $site.themeConfig.author || $site.title }}</a>
      </span>
      <span>
        <i class="iconfont reco-copyright"></i>
        <a>{{ year }}</a>
      </span>
    </div>
  </div>
</template>

<script>
import Background from '@theme/components/Background'

export default {
  components: {Background},
  props: {
    isPage: {
      type: Boolean,
      default: false
    }
  },
  name: 'Password',
  data() {
    return {
      warningText: 'Konck! Knock!',
      key: ''
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    }
  },
  methods: {
    inter () {
      const keyVal = this.key.trim()
      const key = this.isPage ? 'pageKey' : 'key'
      sessionStorage.setItem(key, keyVal)
      const isHasKey = this.isPage ? this.isHasPageKey() : this.isHasKey()
      if (isHasKey) {
        this.warningText = 'Key Error'
        return
      } 
      const passwordBtn = this.$refs.passwordBtn
      const width = document.getElementById('box').getClientRects()[0].width

      passwordBtn.style.width = `${width - 2}px`
      passwordBtn.style.opacity = 1
      setTimeout(() => {
        window.location.reload();
      }, 800)
    },
    isHasKey () {
      const keyPage = this.$site.themeConfig.keyPage
      const keys = keyPage.keys
      return keys && keys.indexOf(sessionStorage.getItem('key')) > -1
    },
    isHasPageKey () {
      const pageKeys = this.$frontmatter.keys

      return pageKeys && pageKeys.indexOf(sessionStorage.getItem('pageKey')) > -1
    },
    inputFocus () {
      this.warningText = 'Input Your Key'
    },
    inputBlur () {
      this.warningText = 'Konck! Knock!'
    }
  }
}
</script>

<style lang="stylus" scoped>
  
.password-shadow {
  width 100vw;
  height 100vh;
  background #fff
  position relative
  padding-left: 20rem;
  .title {
    position: absolute;
    left 0
    right 0
    top 12%
    margin auto
    text-align center
    color #666
    font-size 30px
    box-sizing: border-box;
    padding: 0 10px;
  }
  .description {
    position: absolute;
    left 0
    right 0
    top 20%
    margin auto
    text-align center
    color #999
    font-size 22px
    box-sizing: border-box;
    padding: 0 10px;
  }
  .inputBox{
    max-width:700px;
    height: 100px;
    background: $accentColor;
    border-radius: 2px;
    position: absolute;
    left 0
    right 0
    top 36%
    margin auto
    padding-left 20px
    box-sizing border-box
    opacity 0.9
    input{
      width:600px;
      height:100%;
      border:none;
      padding:0;
      padding-left:5px;
      color: #fff;
      background: none;
      outline: none;
      position: absolute;
      bottom:0;
      opacity 0
      font-size 50px
      &:focus {
        opacity 1
      }
      &:focus~span{
        transform: translateY(-80px);
        color $accentColor
        font-size 30px
        opacity:0.8;
      }
      &:focus~button{
        opacity:1;
        width:100px;
      }
    }
    span{
      width:200px;
      height: 100%;
      display: block;
      position: absolute;
      line-height:100px;
      top:0;
      left:20px;
      color: #fff;
      cursor: text;
      transition: 0.5s;
      transform-origin: left top;
      font-size 30px
    }
    button{
      width:0px;
      height:98px;
      border-radius: 2px;
      position: absolute;
      border 1px solid $accentColor
      right:1px;
      top 1px
      border:0;
      padding:0;
      background: #fff;
      color: $accentColor;
      font-size:18px;
      outline:none;
      cursor: pointer;
      opacity:0;
      transition: 0.5s;
      z-index: 1;
    }
  }
  .footer {
    position: absolute;
    left 0
    right 0
    bottom 10%
    margin auto
    padding: 2.5rem;
    text-align: center;
    color: lighten($textColor, 25%);
    > span {
      margin-left 1rem
      > i {
        margin-right .5rem
      } 
    }
  }
  @media (max-width: $MQMobile) {
    .inputBox{
      max-width:700px;
      height: 60px;
      background: $accentColor;
      border-radius: 2px;
      position: absolute;
      left 0
      right 0
      top 43%
      margin auto
      padding-left 20px
      box-sizing border-box
      opacity 0.9
      input{
        width:600px;
        height:100%;
        border:none;
        padding:0;
        padding-left:5px;
        color: #fff;
        background: none;
        outline: none;
        position: absolute;
        bottom:0;
        opacity 0
        font-size 30px
        &:focus {
          opacity 1
        }
        &:focus~span{
          transform: translateY(-60px);
          color $accentColor
          font-size 20px
          opacity:0.8;
        }
        &:focus~button{
          opacity:1;
          width:60px;
        }
      }
      span{
        width:200px;
        height: 100%;
        display: block;
        position: absolute;
        line-height:60px;
        top:0;
        left:20px;
        color: #fff;
        cursor: text;
        transition: 0.5s;
        transform-origin: left top;
        font-size 20px
      }
      button{
        width:0px;
        height:58px;
        border-radius: 2px;
        position: absolute;
        border 1px solid $accentColor
        right:1px;
        top 1px
        border:0;
        padding:0;
        background: #fff;
        color: $accentColor;
        font-size:18px;
        outline:none;
        cursor: pointer;
        opacity:0;
        transition: 0.5s;
        z-index: 1;
      }
    }
  }
}

// narrow desktop / iPad
@media (max-width: $MQNarrow)
  .password-shadow
    padding-left $mobileSidebarWidth

// wide mobile
@media (max-width: $MQMobile)
  .password-shadow
    padding-left 0
</style>