<template>
  <div class="valine-wrapper">
    <div id="valine" v-show="isComment"></div>
  </div>
</template>

<script>


export default {
  props: ['valineRefresh'],
  computed: {
    // 是否显示评论
    isComment () {
      const frontmatter = this.$page.frontmatter
      return frontmatter.isComment == false || frontmatter.home == true ? false : true
    }
  }, 
  mounted: function(){
    this.createValine()
  },
  methods: {
    createValine () {
      const valineConfig = this.$site.themeConfig.valineConfig
      if (valineConfig) {
        const Valine = require('valine');
        const AV = require('leancloud-storage')
        if (typeof window !== 'undefined') {
          this.window = window
          window.AV = AV
          
        }
        
        new Valine({
          el: '#valine' ,
          appId: valineConfig.appId,// your appId
          appKey: valineConfig.appKey, // your appKey
          verify:false, 
          visitor: true,
          avatar:'retro', 
          path: window.location.pathname,
          placeholder: 'just go go' 
        });
        this.valineRefresh = false
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if(to.path !==  from.path){
        // 切换页面时刷新评论
        // this.$router.go(0)
        setTimeout(() => {
          this.createValine()
        }, 300)
        
      }
    },
    'valineRefresh' (val) {
      if (val) {
        setTimeout(() => {
          this.createValine()
        }, 300)
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
@import '../../styles/config.styl'

.valine-wrapper
  max-width: 740px;
  margin: 0 auto;
  background-color $bgColor
  padding-left $sidebarWidth
@media (max-width: $MQMobile)
  .valine-wrapper
    padding 1rem
</style>
