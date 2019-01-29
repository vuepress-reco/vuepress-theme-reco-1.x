<template>
  <span v-if="$site.themeConfig.valineConfig" :id="idVal" class="leancloud-visitors" data-flag-title="Your Article Title">
    <i class="iconfont reco-eye" style="margin-right: .5rem"></i>
    <a class="leancloud-visitors-count" :style="numStyle"></a>
  </span>
</template>

<script>
export default {
  props: ['idVal', 'numStyle']
}
</script>

<style lang="stylus" scoped>
.leancloud-visitors
  margin-right .5rem
</style>

