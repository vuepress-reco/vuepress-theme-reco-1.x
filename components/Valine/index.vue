<template>
  <div class="valine-wrapper" v-show="isShowComment">
    <div id="valine"></div>
  </div>
</template>

<script>


export default {
  props: ['isComment'],
  computed: {
    // 是否显示评论
    isShowComment () {
      const frontmatter = this.$frontmatter
      return this.isComment == false || frontmatter.isComment == false || frontmatter.home == true ? false : true
    }
  }, 
  mounted: function(){
    this.createValine()
  },
  methods: {
    createValine () {
      const valineConfig = this.$themeConfig.valineConfig
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
          placeholder: valineConfig.placeholder || 'just go go',
          notify: valineConfig.notify || false,
          verify: valineConfig.verify || false,
          avatar: valineConfig.avatar || 'retro',
          visitor: valineConfig.visitor || true,
          recordIP: valineConfig.recordIP || false,
          path: window.location.pathname
        });
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
    }
  },
};
</script>

<style lang="stylus" scoped>

.theme-container.no-sidebar
  .valine-wrapper
    padding-left 0

.valine-wrapper
  background-color $bgColor
  padding-left: 20rem;
  #valine
    padding 2rem
    max-width: 740px;
    margin: 0 auto;
@media (max-width: $MQNarrow)
  .theme-container.no-sidebar
    .valine-wrapper
      padding-left 0
  .valine-wrapper
    padding-left: 16.4rem;
@media (max-width: $MQMobile)
  .valine-wrapper
    padding-left: 0;    
</style>
