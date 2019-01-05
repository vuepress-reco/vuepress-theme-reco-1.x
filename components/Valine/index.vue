<template>
  <div id="valine"></div>
</template>

<script>


export default {
  mounted: function(){
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
        notify:false, 
        verify:false, 
        avatar:'mm', 
        placeholder: 'just go go' 
      });
    }
    
  }
};
</script>

<style lang="stylus" scoped>
#valine
  max-width: 740px;
  margin: 0 auto;
  padding: 0 2.5rem;
  background-color #fff
</style>