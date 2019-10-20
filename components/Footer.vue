<template>
  <div class="footer-wrapper">
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
    <span v-show="$themeConfig.valineConfig !== undefined">
      <i class="iconfont reco-eye"></i>
      <AccessNumber idVal="/" />
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .footer-wrapper {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
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
  .footer {
    text-align: left!important;
    > span {
      display block
      margin-left 0
      line-height 2rem
    }
  }
}
</style>